const express = require('express');
const app = express();
const cors = require('cors');

const redis = require('redis');
const client = redis.createClient();

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

app.use(cors());

app.get('/allJobs', async (req, res) => {
  try {
    const jobs = await getAsync('github');

    res.status(200).send(jobs);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
