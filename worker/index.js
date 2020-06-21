const fetchGithub = require('./fetchGithub');
const CronJob = require('cron').CronJob;
const job = new CronJob(
  '* * * * *',
  fetchGithub,
  null,
  true,
  'America/Los_Angeles',
);

job.start();
