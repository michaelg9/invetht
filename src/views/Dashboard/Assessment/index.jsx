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
    valueRiskProfile: 5,
    valueMarketReaction: null,
  });

  // Do something on step change
  const onStepChange = (stats) => {
    // console.log(stats);
  };

  const onValueChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  const onValueSliderChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  return (
    <Flex
      // display={"flex"}
      // flexDirection="column"
      pt={{ base: "120px", md: "75px" }}
    >
      <StepWizardStyled onStepChange={onStepChange} nav={<Nav />}>
        <ValueToInvest state={{ ...assessmentState, onValueSliderChange }} />
        <Goals state={{ ...assessmentState, onValueSliderChange }} />
        <CrashReaction onValueChange={onValueChange} />
        <CalculationFeedback />
        <DisplayResults />
      </StepWizardStyled>
    </Flex>
  );
}
