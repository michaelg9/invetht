// interface StepWizardChildProps {
//   isActive?: boolean;
//   currentStep?: number;
//   totalSteps?: number;
//   firstStep?: () => {};
//   lastStep?: () => {};
//   nextStep?: () => {};
//   previousStep?: () => {};
//   goToStep?: () => {};
//   goToNamedStep?: () => {};
// }

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
  Tfoot,
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

function ValueToInvest(props) {
  const { state } = props;

  return (
    <Flex direction={"column"} alignItems="center">
      <NavButtons step={1} {...props} />

      <Container
        border="1px"
        borderRadius="xl"
        px="5rem"
        py="2rem"
        borderColor="gray.500"
      >
        <Text>Your wallet currently has {state.walletValueETH} ETH.</Text>

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

        <Box mt='2rem'>
          <Text>How much are you looking to invest?</Text>

          <Center mt="1rem">
            <Text>{state.valueToInvest} ETH</Text>
          </Center>
          <Slider
            min={0}
            max={state.walletValueETH}
            defaultValue={0}
            colorScheme="teal"
            onChange={state.onValueSliderChange}
            mt="1rem"
          >
            <SliderTrack bg="#4fd1c5">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Container>
    </Flex>
  );
}

function Goals(props) {
  return (
    <>
      <NavButtons step={2} {...props} />
      <div>Goals</div>
    </>
  );
}

function CrashReaction(props) {
  return (
    <>
      <NavButtons step={3} {...props} />
      <div>CrashReaction</div>
    </>
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
