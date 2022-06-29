import React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const App = () => {
  const [steps, setStep] = React.useState(['Select campaign settings', 'Create an ad group', 'Create an ad']);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNew = () => {
    const list = [...steps.slice(0, activeStep + 1), 'new', ...steps.slice(activeStep + 1)]
    setStep(list)
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleDelete = () => {
    const newCompleted = completed;
    delete newCompleted[activeStep];
    setCompleted(newCompleted);
    if (isLastStep()) {
      const list = [...steps.slice(0, activeStep), ...steps.slice(activeStep + 1)]
      setStep(list)
      handleBack()
    } else {
      const list = [...steps.slice(0, activeStep), ...steps.slice(activeStep + 1)]
      setStep(list)
      handleNext();
    }
  }
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const Input = styled('input')({
    display: 'none',
  });
  return (
<Box sx={{ display: 'flex' }}>
{localStorage.getItem('token')
  ? (
          <LoggedNarbar></LoggedNarbar>
    )
  : (
          <Navbar></Navbar>
    )}
<Box sx={{ width: '70%', margin: 'auto', mt: 25 }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted()
          ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
            )
          : (
          <React.Fragment>
            <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <h2>Step Title</h2>
            <TextField rows={1} multiline sx={{ mb: 2, width: '100%' }} placeholder="Input question here..." />
            <h2>Upload Photo</h2>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            <h2>Upload Video</h2>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Box>
              <Button variant="contained" component="span">
                Upload
              </Button>
              <TextField rows={1} multiline sx={{ mb: 1, mt: 2, width: '100%' }} placeholder="Or input youtube video here..." />
              </Box>
            </label>
            <h2>Description</h2>
            <TextField rows={6} multiline sx={{ mb: 1, mt: 2, width: '100%' }} placeholder="Input description here..." />

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                size="large"
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
               size="large"
                color="inherit"
                disabled={steps.length === 1}
                onClick={handleDelete}
                sx={{ mr: 1 }}
              >
                delete
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button size="large"
                variant="outlined"
                onClick={handleNew} sx={{ mr: 1 }}>
                New
              </Button>
              <Button
              size="large"
              variant="outlined"
              onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
                  <Button
                  size="large"
                  variant="outlined"
                  onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Save Step'}
                  </Button>
            </Box>
          </React.Fragment>
            )}
      </div>
    </Box>
    </Box>
  );
};

export default App;
