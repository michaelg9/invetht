import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Center, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const NavButtons = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  step,
  hideForward,
  children,
}) => {
  const history = useHistory();

  function navigateToPortfolio() {
    history.push("/admin/portfolio");
  }

  return (
    <Center>
      {step > 1 ? (
        <Button variant="ghost" onClick={previousStep}>
          <ArrowBackIcon />
        </Button>
      ) : (
        <div />
      )}

      {children ? children : <Text mx="2rem">Preferences</Text>}

      {!hideForward &&
        (step < totalSteps ? (
          <Button variant="ghost" onClick={nextStep}>
            <ArrowForwardIcon />
          </Button>
        ) : (
          <Button onClick={navigateToPortfolio} variant="ghost">
            Finish
          </Button>
        ))}
    </Center>
  );
};

export default NavButtons;
