import {
  Button,
  Box,
  Flex,
  Text,
  Center,
  Container,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import StepWizard from "react-step-wizard";
import styled from "@emotion/styled";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

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
    height: 110%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }
`;

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
            <Text>{state.valueRiskProfile}</Text>
          </Center>
          <Slider
            min={1}
            max={9}
            defaultValue={5}
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
  function onCardClick(value) {
    props.onValueChange("valueMarketReaction", value);

    props.goToStep(props.currentStep + 1);
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={3} {...props} />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        <Text fontSize="2xl">
          Due to macroeconomic conditions, the entire crypto market goes down by
          45%.
        </Text>
        <Text fontSize="2xl">What do you do?</Text>

        <Flex
          display="flex"
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
  return (
    <>
      <NavButtons step={4} {...props} />
      <div>CalculationFeedback</div>
    </>
  );
}

function DisplayResults(props) {
  return (
    <>
      <NavButtons step={5} {...props} />
      <div>DisplayResults</div>
    </>
  );
}

const Nav = (props) => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    // const isActive = props.currentStep === i;
    dots.push(
      <span
        key={`step-${i}`}
        // className={`${styles.dot} ${isActive ? styles.active : ""}`}
        onClick={() => props.goToStep(i)}
      >
        &bull;
      </span>
    );
  }

  return (
    <div
    //   className={styles.nav}
    >
      {dots}
    </div>
  );
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
  children,
}) => (
  <Center>
    {step > 1 ? (
      <Button variant="ghost" onClick={previousStep}>
        <ArrowBackIcon />
      </Button>
    ) : (
      <div />
    )}

    {children ? children : <Text>Preferences</Text>}

    {step < totalSteps ? (
      <Button variant="ghost" onClick={nextStep}>
        <ArrowForwardIcon />
      </Button>
    ) : (
      <Button onClick={nextStep}>Finish</Button>
    )}
  </Center>
);

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
