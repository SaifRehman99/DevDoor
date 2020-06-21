const fetch = require('node-fetch');
const redis = require('redis');
const client = redis.createClient();

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

async function fetchGithub() {
  let allJobs = [];
  let onPage = 0;
  let pageCount = 1;

  try {
    // fetching and storing the data
    while (pageCount > 0) {
      const res = await fetch(
        `https://jobs.github.com/positions.json?page=${onPage}`,
      );
      const data = await res.json();

      pageCount = data.length;
      allJobs.push(...data);

      console.log(`Got ${data.length} jobs`);

      onPage++;
    }

    // Filter alog to filter only junior devs Jobs
    const jrJobs = allJobs.filter((job) => {
      const title = job.title.toLowerCase();

      if (
        title.includes('senior') ||
        title.includes('sr.') ||
        title.includes('manager') ||
        title.includes('architect')
      ) {
        return false;
      } else {
        return true;
      }
    });

    console.log('Got', allJobs.length, 'in total');
    console.log('Got', jrJobs.length, 'in after filer');
    const success = await setAsync('github', JSON.stringify(jrJobs));
    console.log(success);
  } catch (error) {
    console.log(error);
  }
}
fetchGithub();
module.exports = fetchGithub;
