const CronJob = require('cron').CronJob;
const Cron = require('./mongodb_backup.js');

// nada ñaslkdjf ñaslkdjdf kjhg
// AutoBackUp every week (at 00:00 on Sunday)
new CronJob(
  '0 8 * * *',
  function() {
    Cron.dbAutoBackUp();
  },
  null,
  true,
  'Atlantic/Canary'
);