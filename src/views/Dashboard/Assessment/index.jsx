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
    valueToInvest: null,
    valueRiskProfile: null,
    valueMarketReaction: null,
    valueVaultChoice: null,
  });
  const [gardenData, setGardenData] = useState([]);

  // Do something on step change
  const onStepChange = (stats) => {
    // console.log(stats);
  };

  const onValueChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  const onValueSliderChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  return (
    <Flex pt={{ base: "120px", md: "75px" }}>
      <StepWizardStyled onStepChange={onStepChange} nav={<Nav />}>
        <ValueToInvest state={{ ...assessmentState, onValueSliderChange }} />
        <Goals state={{ ...assessmentState, onValueSliderChange }} />
        <CrashReaction state={assessmentState} onValueChange={onValueChange} />
        <CalculationFeedback
          state={assessmentState}
          gardens={{ gardenData, setGardenData }}
        />
        <DisplayResults
          state={{ ...assessmentState, onValueChange }}
          gardens={gardenData}
        />
      </StepWizardStyled>
    </Flex>
  );
}