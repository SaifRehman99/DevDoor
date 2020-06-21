import React, { useState, useEffect } from 'react';
import './App.css';

import { Jobs } from './components';

import fetch from 'node-fetch';
function App() {
  const [jobs, setJobs] = useState([]);

  async function fetchJobs() {
    const res = await fetch('http://localhost:9000/allJobs');

    const data = await res.json();

    return data;
  }

  useEffect(() => {
    const fetchAPI = async () => {
      setJobs(await fetchJobs());
    };
    fetchAPI();
  }, []);

  return (
    <div className='App'>
      {jobs.length ? (
        <div>
          <Jobs jobs={jobs} />
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
}

export default App;
