import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
    walletValueETH: null,
    valueToInvest: null,
    valueRiskProfile: null,
    valueMarketReaction: null,
    valueVaultChoice: null,
  });
  const [gardenData, setGardenData] = useState([]);
  const { account, library, active } = useWeb3React();

  const history = useHistory();

  const onValueChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  const onValueSliderChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value });

  const getBalance = useCallback(async () => {
    if (!library) return;

    const signer = library.getSigner();

    const balance = await signer.provider.getBalance(account);
    setAssessmentState({
      ...assessmentState,
      walletValueETH: ethers.utils.formatEther(balance),
    });
  }, [account, assessmentState, library]);

  useEffect(() => {
    if (library && account && !assessmentState.walletValueETH) {
      console.log({ library });
      getBalance();
    }
  }, [library, account, getBalance, assessmentState.walletValueETH]);

  return (
    <Flex pt={{ base: "120px", md: "75px" }}>
      {active ? (
        <StepWizardStyled nav={<Nav />}>
          <ValueToInvest state={{ ...assessmentState, onValueSliderChange }} />
          <Goals state={{ ...assessmentState, onValueSliderChange }} />
          <CrashReaction
            state={assessmentState}
            onValueChange={onValueChange}
          />
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
