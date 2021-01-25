


//Fs and lodash npm modules should be installed.
//Make sure that your MongoDB is protected with a username and password. If they aren't, follow the steps here.

//
// por Shubham Ankit



var fs = require('fs');
var _ = require('lodash');
var exec = require('child_process').exec;

var dbOptions =  {
    user: 'appBuscaDGT',
    pass: 'buscaDGT147239',
    host: 'localhost',
    port: 27017,
    database: 'deDGT',
    autoBackup: true, 
    removeOldBackup: true,
    keepLastDaysBackup: 2,
    autoBackupPath: 'c:/backup' // i.e. /var/database-backup/
};




exports.stringToDate = function (dateString) {
    return new Date(dateString);
}




//return if variable is empty or not. 

exports.empty = function(mixedVar) {
    var undef, key, i, len;
    var emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedVar === 'object') {
        for (key in mixedVar) {
            return false;
        }
        return true;
    }
    return false;
};




// Auto backup script
const dbAutoBackUp =  function () {
// check for auto backup is enabled or disabled
    if (dbOptions.autoBackup == true) {
        var date = new Date();
        var beforeDate, oldBackupDir, oldBackupPath;
        currentDate = this.stringToDate(date); // Current date
        var newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        var newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
        // check for remove old backup after keeping # of days given in configuration
        if (dbOptions.removeOldBackup == true) {
            beforeDate = _.clone(currentDate);
            beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
            oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
            oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
        }
        var cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass + ' --out ' + newBackupPath; // Command for mongodb dump process
        exec(cmd, function (error, stdout, stderr) {
            if (this.empty(error)) {
                // check for remove old backup after keeping # of days given in configuration
              if (dbOptions.removeOldBackup == true) {
                    if (fs.existsSync(oldBackupPath)) {
                        exec("rm -rf " + oldBackupPath, function (err) { });
                    }
                }
            }
        });
    }
}
