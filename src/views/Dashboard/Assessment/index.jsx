import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import {
  CalculationFeedback,
  CrashReaction,
  DisplayResults,
  Goals,
  Nav,
  StepWizardStyled,
  ValueToInvest,
} from "./Wizard/index.jsx";
export default function Assessment() {
  const [assessmentState, setAssessmentState] = useState({
    walletValueETH: 10, // TODO: get from user
    valueToInvest: null,
    valueRiskProfile: null,
    valueMarketReaction: null,
    valueVaultChoice: null,
  });
  const [gardenData, setGardenData] = useState([]);

  const onValueChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  const onValueSliderChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  return (
    <Flex pt={{ base: "120px", md: "75px" }}>
      <StepWizardStyled nav={<Nav />}>
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
