import {
  Box,
  Button,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { formatUnits } from "views/Dashboard/Explore/data";
import { ICoreGarden } from "views/Dashboard/Explore/interfaces";
import { Card } from "./index";
import ManualData from "./manual_data";
import NavButtons from "./NavButtons";

export default function DisplayResults(props) {
  const { library, account } = useWeb3React();
  const [deposited, setDeposited] = useState(false);

  const { state, gardens } = props;

  function onCardClick(value) {
    setDeposited(false);

    state.onValueChange("valueVaultChoice", value);
  }

  async function invethedInVault() {
    setDeposited(false);

    const { valueToInvest, valueVaultChoice } = state;

    const gardenData = gardens[valueVaultChoice - 1];
    const signer = library.getSigner();

    const gardenContract = new ethers.Contract(
      gardenData.address,
      ICoreGarden.abi,
      signer
    );

    const amountIn = ethers.utils.parseUnits(`${valueToInvest}`, 18);
    const minAmountOut = 0;
    const to = account;
    const referer = "0x4bFC74983D6338D3395A00118546614bB78472c2";

    try {
      await gardenContract
        .connect(signer)
        .deposit(amountIn, minAmountOut, to, referer, {
          value: amountIn,
        });
      onCardClick(null); // reset vault
      setDeposited(true);
      window.deposits = window.deposits ? window.deposits.push({gardenData, gardenContract}) : [{gardenData, gardenContract, valueToInvest}];
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={5} {...props} />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        {gardens.length ? (
          <>
            <Text fontSize="2xl">
              Recommendations ready. Vaults shown are most aligned with your
              determined needs.
            </Text>

            <Flex>
              {gardens.slice(0, 3).map((garden, index) => {
                let manualGardenData = ManualData.find(
                  (data) => data.address === garden.address
                );
                if (!manualGardenData) {
                  manualGardenData = {
                    description: "",
                    D30: 0,
                    D90: 0,
                  };
                }

                const gardenStyle = {
                  marginLeft: "1rem",
                  width: "20px",
                  height: "20px",
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "50%",
                };
                const GardenLogo = <img src={`https://ethplorer.io/images/${garden.reserveAssetSymbol.toLowerCase()}.png`} alt={garden.reserveAssetSymbol} style={gardenStyle} />

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
                          currentTarget.src = "./assets/invest.svg";
                        }}
                      />

                      <Flex mx="1rem" w="100%" justifyContent="center">
                        <IoIosCheckmarkCircleOutline
                          style={{
                            weight: "20px",
                            height: "20px",
                            color: "white",
                            backgroundColor: "#4fd1c5",
                            borderRadius: "50%",
                          }}
                        />

                        {GardenLogo}
                      </Flex>
                    </Flex>

                    <Text fontSize="2xl" mt="1rem">
                      {garden.name}
                    </Text>

                    <Text mt="1rem" wordBreak="break-all">
                      {manualGardenData.description}
                    </Text>

                    <TableContainer mt="2rem">
                      <Table variant="simple">
                        <Tbody>
                          <Tr>
                            <Td>NAV</Td>
                            <Td isNumeric>{`${formatUnits(garden.nav, 32, 36)} ${garden.reserveAssetSymbol}`}</Td>
                          </Tr>
                          <Tr>
                            <Td>30D</Td>
                            <Td isNumeric>{manualGardenData.D30}%</Td>
                          </Tr>
                          <Tr>
                            <Td>90D</Td>
                            <Td isNumeric>{manualGardenData.D90}%</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Card>
                );
              })}
            </Flex>

            <Button
              disabled={!state.valueVaultChoice}
              onClick={invethedInVault}
            >
              Deposit
            </Button>

            {deposited && (
              <Text> Successfully deposited to chosen vault.</Text>
            )}
          </>
        ) : (
          <Text fontSize="2xl">
            Vaults not loaded. Were you missing some steps?
          </Text>
        )}
      </Box>
    </Flex>
  );
}
