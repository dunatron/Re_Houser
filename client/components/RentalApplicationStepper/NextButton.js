const NextButton = ({ activeStep, handleComplete, completed }) => {
  if (completed)
    return (
      <Button variant="contained" color="primary" onClick={handleComplete}>
        Next
      </Button>
    );
  switch (activeStep) {
    case 0: {
      return (
        <Button variant="contained" color="primary" onClick={handleComplete}>
          Complete User Details
        </Button>
      );
    }
    case 1: {
      return (
        <Button variant="contained" color="primary" onClick={handleComplete}>
          Complete Application Details
        </Button>
      );
    }
    case 2: {
      return (
        <Button variant="contained" color="primary" onClick={handleComplete}>
          Complete Pre tenancy step
        </Button>
      );
    }
    default: {
      // return null; // handling complete on that functionas the application should self update at steps. this just submits it
      return (
        <Button variant="contained" color="primary" onClick={handleComplete}>
          Finish
        </Button>
      );
    }
  }
};

export default NextButton;
