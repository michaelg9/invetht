import {
  Box,
  Button, Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr
} from "@chakra-ui/react";
import { VisaIcon } from "components/Icons/Icons";
import NavButtons from "./NavButtons";
import { Card } from "./index";
import { ethers, network } from "ethers";
import { useWeb3React } from "@web3-react/core";
import {
  IBabController,
  IGarden
} from "./interfaces";
import { sign } from "crypto";
import { useState } from "react";
import { impersonateAccount } from "./lib/helper";




export default function DisplayResults(props) {
  const [gardenClick, setGardenClick] = useState({})
  const { state, gardens } = props;
  const {
    AddressZero,
  } = ethers.constants;

  const { active, account, library, activate, deactivate } = useWeb3React();

  function onCardClick(value) {
    setGardenClick(Object.values(value))
    state.onValueChange("valueVaultChoice", Object.keys(value));
    console.log(Object.keys(value));
    console.log(Object.values(value));

  }



  // async function impersonateAddress() {
  //   const account = "0x54be3a794282c030b15e43ae2bb182e14c409c5e";
  //     const provider = ethers.provider;
  //      await provider.request({
  //        method: "hardhat_impersonateAccount",
  //        params: [account],
  //      });
  //      const signer = await ethers.provider.getSigner(account);
  //      signer.address = signer._address;
  //      return signer;
  // }

  
  async function invethedInVault(gardens) {
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

    // const ethaccount = account

    const signer = impersonateAccount()
    console.log(signer)

    //controller instance
    const controllerContract = new ethers.Contract(
      "0xD4a5b5fcB561dAF3aDF86F8477555B92FBa43b5F",
      IBabController.abi,
      signer
    );

    try{
      //garden instance
       const gardenContract = new ethers.Contract(
         gardenClick[0].address,
         IGarden.abi,
         signer
       );
       
       //deposit function
       const depositTx = await gardenContract.deposit(
           ethers.utils.parseEther(valueToInvest),
           0,
           signer.address,
           AddressZero,
           {
             value: ethers.utils.parseEther(valueToInvest),
           }
         );
    } catch (error) {
      console.error(error)
    }


      console.log(gardenClick[0])
    // console.log("TODO: Invest in vault with args", { args });
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
                onClick={() => onCardClick({[`${index + 1}`]: garden})}
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
                    }} />

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

        <Button disabled={!state.valueVaultChoice} onClick={() => invethedInVault(gardens)}>
          Deposit
        </Button>
      </Box>
    </Flex>
  );
}
