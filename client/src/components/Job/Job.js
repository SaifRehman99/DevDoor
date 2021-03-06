import React from 'react';
import { Typography } from '@material-ui/core';

import Moment from 'react-moment';

import style from './Job.module.css';

import Modal from './JobModal';

const Job = ({ job: { title, company, location, created_at }, onClick }) => {
  return (
    <div className={style.job} onClick={onClick}>
      <div>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='h5' className={style.jobCompany}>
          {company}
        </Typography>
        <Typography>{location}</Typography>
      </div>
      <div>
        <Typography>{created_at.split(' ').slice(0, 3).join(' ')}</Typography>
        <Typography>
          <Moment fromNow>{created_at}</Moment>
        </Typography>
      </div>
    </div>
  );
};

export default Job;
