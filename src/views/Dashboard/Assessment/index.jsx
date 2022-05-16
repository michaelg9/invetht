import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import {
  StepWizardStyled,
  CalculationFeedback,
  CrashReaction,
  DisplayResults,
  Goals,
  ValueToInvest,
  Nav,
} from "./wizard.jsx";

export default function Assessment() {
  const [assessmentState, setAssessmentState] = useState({
    walletValueETH: 10, // TODO: get from user
    valueToInvest: 0,
  });

  // Do something on step change
  const onStepChange = (stats) => {
    console.log(stats);
  };

  const onValueSliderChange = (value) =>
  setAssessmentState({ ...assessmentState, valueToInvest: value });

  console.log("assessmentState", assessmentState);

  return (
    <Flex
      // display={"flex"}
      // flexDirection="column"
      pt={{ base: "120px", md: "75px" }}
    >
      <StepWizardStyled onStepChange={onStepChange} nav={<Nav />}>
        <ValueToInvest state={{ ...assessmentState, onValueSliderChange }} />
        <Goals />
        <CrashReaction />
        <CalculationFeedback />
        <DisplayResults />
      </StepWizardStyled>
    </Flex>
  );
}
