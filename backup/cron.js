const CronJob = require('cron').CronJob;
const Cron = require('./mongodb_backup.js');


// AutoBackUp todos los dias a la 08 am
new CronJob(
  '0 8 * * *',
  function() {
    Cron.dbAutoBackUp();
  },
  null,
  true,
  'Atlantic/Canary'
);