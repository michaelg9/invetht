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
    Tr
} from "@chakra-ui/react";
import NavButtons from "./NavButtons";

export default function ValueToInvest(props) {
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
