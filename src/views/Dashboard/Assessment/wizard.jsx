import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";
import { VisaIcon } from "components/Icons/Icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import StepWizard from "react-step-wizard";
import { getControllerContract, getGardens } from "../Explore";

function ValueToInvest(props) {
  const { state } = props;

  function onSliderChange(value) {
    state.onValueSliderChange("valueToInvest", value);
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={1} {...props} />

      <Box
        border="1px"
        borderRadius="xl"
        px="5rem"
        py="2rem"
        borderColor="gray.500"
      >
        <Text fontSize="2xl">
          Your wallet currently has {state.walletValueETH} ETH.
        </Text>

        <TableContainer>
          <Table variant="simple">
            <TableCaption placement="top">Current holdings</TableCaption>

            <Thead>
              <Tr>
                <Th>Asset</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>20 ETH</Td>
                <Td isNumeric>$58,200</Td>
              </Tr>
              <Tr>
                <Td>2 YFI</Td>
                <Td isNumeric>$36,100</Td>
              </Tr>
              <Tr>
                <Td>300 MATIC</Td>
                <Td isNumeric>$417</Td>
              </Tr>
              <Tr>
                <Td>7014 FRAX</Td>
                <Td isNumeric>$7,014</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Box mt="2rem">
          <Text fontSize="2xl">How much are you looking to invest?</Text>

          <Center mt="1rem">
            <Text>{state.valueToInvest} ETH</Text>
          </Center>
          <Slider
            min={0}
            max={state.walletValueETH}
            defaultValue={0}
            colorScheme="teal"
            onChange={onSliderChange}
            mt="1rem"
          >
            <SliderTrack bg="#4fd1c5">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Box>
    </Flex>
  );
}

function Goals(props) {
  const { state } = props;

  function onSliderChange(value) {
    state.onValueSliderChange("valueRiskProfile", value);
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={2} {...props} />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        <Text fontSize="2xl">What are your goals?</Text>

        <Flex>
          <Container
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex direction="column" alignItems="center" py="1rem">
              <Text fontSize="4rem">🐷</Text>

              <Text fontSize="2xl" mt="1rem">
                Conservative
              </Text>

              <Text mt="1rem">
                Stable and predictable returns. My money is always safe
                regardless of market volatility.
              </Text>
            </Flex>

            <Text align={"center"} mb="1rem">
              1 - 3
            </Text>
          </Container>

          <Container
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex direction="column" alignItems="center" py="1rem">
              <Text fontSize="4rem">🪴</Text>

              <Text fontSize="2xl" mt="1rem">
                Steady Growth
              </Text>

              <Text mt="1rem">
                I want to have exposure to crypto whilst minimizing risk. Long
                term focused, targeting constant growth YoY.
              </Text>
            </Flex>

            <Text align={"center"} mb="1rem">
              4 - 6
            </Text>
          </Container>

          <Container
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex direction="column" alignItems="center" py="1rem">
              <Text fontSize="4rem">🚀</Text>

              <Text fontSize="2xl" mt="1rem">
                To the moon
              </Text>

              <Text mt="1rem">
                Targeting multiples for my portfolio. Ready for a 100x.
              </Text>
            </Flex>

            <Text align={"center"} mb="1rem">
              7 - 9
            </Text>
          </Container>
        </Flex>

        <Box mt="2rem">
          <Text fontSize="2xl">What is your risk profile?</Text>

          <Center mt="1rem">
            <Text>{state.valueRiskProfile ? state.valueRiskProfile : "-"}</Text>
          </Center>
          <Slider
            min={0}
            max={9}
            defaultValue={0}
            colorScheme="teal"
            onChange={onSliderChange}
            mt="1rem"
          >
            <SliderTrack bg="#4fd1c5">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Box>
    </Flex>
  );
}

function CrashReaction(props) {
  const { state } = props;

  function onCardClick(value) {
    props.onValueChange("valueMarketReaction", value);

    props.goToStep(props.currentStep + 1);
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={3} {...props} hideForward />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        <Text fontSize="2xl">
          Due to macroeconomic conditions, the entire crypto market goes down by
          45%.
        </Text>
        <Text fontSize="2xl">What do you do?</Text>

        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Card
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="2rem 1rem 1rem 1rem"
            p="1rem"
            onClick={() => onCardClick(1)}
            active={state.valueMarketReaction === 1}
          >
            <Text>
              Buy more, prices are cheap and it's a perfect buying opportunity
            </Text>
          </Card>

          <Card
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            p="1rem"
            onClick={() => onCardClick(2)}
            active={state.valueMarketReaction === 2}
          >
            <Text>Hodl. Prices will eventually recover.</Text>
          </Card>

          <Card
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            p="1rem"
            onClick={() => onCardClick(3)}
            active={state.valueMarketReaction === 3}
          >
            <Text>
              Sell some of my assets. It can go lower and I want to take some
              funds from the market.
            </Text>
          </Card>

          <Card
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            p="1rem"
            onClick={() => onCardClick(4)}
            active={props.valueMarketReaction === 4}
          >
            <Text>
              Sell everything. Investing in cryptocurrency was a mistake.
            </Text>
          </Card>
        </Flex>
      </Box>
    </Flex>
  );
}

function CalculationFeedback(props) {
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

function DisplayResults(props) {
  const { state, gardens } = props;

  function onCardClick(value) {
    console.log(value);
    state.onValueChange("valueVaultChoice", value);
  }

  function invethedInVault() {
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
    console.log("TODO: Invest in vault with args", { args });
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={5} {...props} />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        <Text fontSize="2xl">
          Recommendations ready. Vaults shown are most aligned with your
          determined needs.
        </Text>

        <Flex>
          {gardens.slice(0, 3).map((garden, index) => {
            return (
              <Card
                key={garden.name}
                display="flex"
                flexDirection="column"
                border="1px"
                borderRadius="xl"
                borderColor="teal.300"
                m="2rem 1rem 1rem 1rem"
                p="1rem"
                onClick={() => onCardClick(index + 1)}
                active={state.valueVaultChoice === index + 1}
              >
                <Flex>
                  <Image
                    src={`https://www.babylon.finance/gardens/${garden.address}/thumb.png`}
                    h={"40px"}
                    w={"40px"}
                    pe="5px"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/assets/invest.svg";
                    }}
                  />

                  <Box mx="1rem" w="100%" textAlign="center">
                    <VisaIcon h={"40px"} w={"40px"} />
                  </Box>
                </Flex>

                <Text fontSize="2xl" mt="1rem">
                  {garden.name}
                </Text>

                <Text mt="1rem" wordBreak="break-all">
                  <Box>Address: </Box>
                  {garden.address}
                </Text>

                <TableContainer>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>NAV</Td>
                        <Td isNumeric>$58,200</Td>
                      </Tr>
                      <Tr>
                        <Td>30D</Td>
                        <Td isNumeric>7.1%</Td>
                      </Tr>
                      <Tr>
                        <Td>90D</Td>
                        <Td isNumeric>9%</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Card>
            );
          })}
        </Flex>

        <Button disabled={!state.valueVaultChoice} onClick={invethedInVault}>
          Deposit
        </Button>
      </Box>
    </Flex>
  );
}

const Nav = (props) => {
  const dots = [];

  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;

    dots.push(
      <NavDotStyled
        key={`nav-dot-${i}`}
                active={isActive}
        onClick={() => props.goToStep(i)}
      >
        &bull;
      </NavDotStyled>
    );
  }

  return <NavStyled>{dots}</NavStyled>;
};

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

const StepWizardStyled = styled(StepWizard)`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

const Card = styled(Container)`
  cursor: pointer;
  &:hover {
    background-color: #4fd1c5;
    transform: translateY(-5px);
    height: 120%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }
  ${(props) => {
    if (props.active)
      return `
      background-color: #4fd1c5;
      transform: translateY(-5px);
      height: 120%;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
      `;
  }}
`;

const NavStyled = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const NavDotStyled = styled.span`
  color: black;
  cursor: pointer;
  font-size: 36px;
  line-height: 1;
  margin: 0 15px;
  opacity: 0.4;
  text-shadow: none;
  transition: opacity 1s ease, text-shadow 1s ease;
  will-change: opacity, text-shadow;

  ${(props) => {
    if (props.active)
      return `
    color: #4fd1c5;
    opacity: 1;
    text-shadow: 0 0px 8px;
    `;
  }}
`;

export {
  StepWizardStyled,
  ValueToInvest,
  Goals,
  CrashReaction,
  CalculationFeedback,
  DisplayResults,
  Nav,
  NavButtons,
};
