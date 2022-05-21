import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useBalances } from "../Portfolio/api.ts";
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
    walletValueETH: 5,
    valueToInvest: null,
    valueGoal: null,
    valueRiskProfile: null,
    valueMarketReaction: null,
    valueVaultChoice: null,
  });
  const [gardenData, setGardenData] = useState([]);
  const { account, active } = useWeb3React();
  const walletBalances = useBalances(account);

  const history = useHistory();

  const onValueChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  const onValueSliderChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  useEffect(() => {
    if (!assessmentState.walletValueETH && walletBalances.response) {
      setAssessmentState({
        ...assessmentState,
        walletValueETH: walletBalances.response.ETH.balance,
      });
    }
  }, [assessmentState, walletBalances]);

  return (
    <Flex pt={{ base: "120px", md: "75px" }}>
      {active ? (
        <StepWizardStyled nav={<Nav />}>
          <ValueToInvest
            state={{ ...assessmentState, onValueSliderChange, walletBalances }}
          />
          <Goals
            state={{ ...assessmentState, onValueSliderChange, onValueChange }}
          />
          <CrashReaction state={{ ...assessmentState, onValueChange }} />
          <CalculationFeedback
            state={assessmentState}
            gardens={{ gardenData, setGardenData }}
          />
          <DisplayResults
            state={{ ...assessmentState, onValueChange }}
            gardens={gardenData}
          />
        </StepWizardStyled>
      ) : (
        <Box>
          <Text fontSize="2xl">No connected wallet found.</Text>
          <Box>
            <Button
              variant="outline"
              onClick={() => history.push("/admin/connect")}
            >
              Please connect first!
            </Button>
          </Box>
        </Box>
      )}
    </Flex>
  );
}
