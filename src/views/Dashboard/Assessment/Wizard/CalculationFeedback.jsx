import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { getControllerContract, getGardens } from "../../Explore";
import NavButtons from "./NavButtons";

export default function CalculationFeedback(props) {
  const [progressValue, setProgressValue] = useState(0);
  const [timer, setTimer] = useState(null);

  const { state, gardens } = props;

  const { library } = useWeb3React();
  const [loadingGardens, setLoadingGardens] = useState(false);

  const allValuesCollected =
    !!state.valueToInvest &&
    !!state.valueRiskProfile &&
    !!state.valueMarketReaction;

  const progressRef = useRef(progressValue);
  const timerRef = useRef(timer);

  useEffect(() => {
    progressRef.current = progressValue;
  }, [progressValue]);

  useEffect(() => {
    timerRef.current = timer;
  }, [timer]);

  const getVaultData = useCallback(async () => {
    const controller = getControllerContract(library);
    const gardenData = await getGardens(controller, library);

    gardens.setGardenData(gardenData);

    console.log({ gardenData });

    return gardenData;
  }, [gardens, library]);

  useEffect(() => {
    async function getVaults() {
      if (
        props.isActive &&
        gardens.gardenData.length === 0 &&
        !loadingGardens &&
        !!library
      ) {
        const {
          valueToInvest,
          valueRiskProfile,
          valueMarketReaction,
          valueVaultChoice,
        } = state;

        const args = {
          valueToInvest,
          valueRiskProfile,
          valueMarketReaction,
          valueVaultChoice,
        };
        console.log("TODO: get gardens with args", { args });

        setLoadingGardens(true);
        await getVaultData();
        setLoadingGardens(false);
      }
    }
    getVaults();
  }, [
    state,
    props.isActive,
    gardens.gardenData.length,
    loadingGardens,
    setLoadingGardens,
    library,
    getVaultData,
  ]);

  const updateProgress = useCallback(() => {
    if (progressRef.current === 100) {
      clearInterval(timerRef.current);
    }

    setProgressValue((progressValue) =>
      progressValue + 1 > 100 ? 100 : progressValue + 1
    );
  }, []);

  const previousIsActive = useRef(false);
  useEffect(() => {
    if (!previousIsActive.current && props.isActive && allValuesCollected) {
      previousIsActive.current = true;

      const timer = setInterval(() => {
        updateProgress();
      }, 70);
      setTimer(timer);
    }

    if (!props.isActive && previousIsActive.current) {
      previousIsActive.current = false;

      clearInterval(timerRef.current);

      if (props.currentStep === 3) setProgressValue(0);
    }
  }, [
    props.isActive,
    props.currentStep,
    timer,
    allValuesCollected,
    updateProgress,
  ]);

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={4} hideForward={progressValue !== 100} {...props} />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        {allValuesCollected ? (
          <>
            <Text fontSize="2xl">
              Calculating ideal recommendations based on your answers.
            </Text>
            <Text fontSize="2xl">
              Determining the best solution for your needs.
            </Text>

            <Text mt="2rem">{progressValue}%</Text>

            <Text>
              {progressValue === 100 &&
                "Best solution found! Forwarding you to your best fitting vaults."}
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="2xl">Not all values are collected yet!</Text>
            <Text fontSize="2xl">
              Please fill all questions of previous steps.
            </Text>
          </>
        )}

        <Progress colorScheme="teal" mt="1rem" value={progressValue} />
      </Box>
    </Flex>
  );
}
