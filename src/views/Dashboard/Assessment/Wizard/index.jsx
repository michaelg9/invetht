import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { VisaIcon } from "components/Icons/Icons";
import StepWizard from "react-step-wizard";
import NavButtons from "./NavButtons";

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

const StepWizardStyled = styled(StepWizard)`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
`;

export const Card = styled(Container)`
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

export { StepWizardStyled, DisplayResults };
