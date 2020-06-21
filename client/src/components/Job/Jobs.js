import React, { Fragment, useEffect } from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import Job from './Job';
import JobModal from './JobModal';

const Jobs = ({ jobs }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedJob, selectJob] = React.useState({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  // hanlding page number
  let pageNum = Math.ceil(jobs.length / 40);
  let nextpage = pageNum - 1;

  // Jobs per page
  const jobsPerPage = jobs.slice(activeStep * 40, activeStep * 40 + 40);

  return (
    <div className='jobs'>
      <JobModal open={open} handleClose={handleClose} job={selectedJob} />
      <Typography variant='h3' components='h1'>
        Entry Level Software Jobs
      </Typography>
      <Typography variant='h6' components='h1'>
        Found {jobs.length} Jobs
      </Typography>

      <Typography>
        {jobsPerPage.map((job, i) => (
          <Job
            key={i}
            job={job}
            onClick={() => {
              handleClickOpen();
              selectJob(job);
            }}
          />
        ))}
      </Typography>

      <Fragment>
        Page {activeStep + 1} of {pageNum}
        <MobileStepper
          variant='progress'
          steps={pageNum}
          position='static'
          activeStep={activeStep}
          nextButton={
            <Button
              size='small'
              onClick={handleNext}
              disabled={activeStep === nextpage}>
              Next
            </Button>
          }
          backButton={
            <Button
              size='small'
              onClick={handleBack}
              disabled={activeStep === 0}>
              Back
            </Button>
          }
        />
      </Fragment>
    </div>
  );
};

export default Jobs;
