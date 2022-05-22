import {
  Box,
  Center,
  Flex,
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
import NavButtons from "./NavButtons";

export default function ValueToInvest(props) {
  const { state } = props;

  function onSliderChange(value) {
    state.onValueSliderChange("valueToInvest", value);
  }

  const walletResponse = state.walletBalances.response;

  const ethBalance = (walletResponse && walletResponse.ETH.balance) || 0;
  const ethValue = ((walletResponse && walletResponse.ETH.price.rate * ethBalance) || 0).toFixed(2);
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
          Your wallet currently has {state.walletValueETH.toFixed(4)} ETH.
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
                <Td>{ethBalance.toFixed(4)} ETH</Td>
                <Td isNumeric>${ethValue}</Td>
              </Tr>
              {walletResponse?.tokens && walletResponse.tokens.map((token) => {
                  const balance = token.balance / Math.pow(10, Number(token.tokenInfo.decimals));
                  return (
                    <Tr key={token.tokenInfo.symbol}>
                      <Td>
                        {balance} {token.tokenInfo.symbol}
                      </Td>
                      <Td isNumeric>${token.tokenInfo.price.rate?.toFixed(2)}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>

        <Box mt="2rem">
          <Text fontSize="2xl">How much are you looking to invest?</Text>

          <Center mt="1rem">
            <Flex flexDirection="column" alignItems="center">
              <Text>{state.valueToInvest} ETH</Text>

              {state.walletValueETH === 0 && (
                <Text>
                  Sorry, not enough ETH funds to invest. Please top up your
                  wallet.
                </Text>
              )}
            </Flex>
          </Center>

          <Slider
            min={0}
            value={state.valueToInvest || 0}
            max={state.walletValueETH}
            step={state.walletValueETH / 10}
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
