import { Flex, Image, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import { GardenDataType } from "./data";

interface GardenTableRowProps {
  data: GardenDataType;
}

function GardenTableRow({ data }: GardenTableRowProps) {
  console.log(data);
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Image src={`https://www.babylon.finance/gardens/${data.address}/thumb.png`} h={"40px"} w={"40px"} pe="5px" onError={({currentTarget}) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="/assets/invest.svg";
          }} />
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {data.name}
          </Text>
        </Flex>
      </Td>
      <Td>{data.totalStake.toString()}</Td>
      <Td>?</Td>
      <Td>?</Td>
      <Td>?</Td>
    </Tr>
  );
}

export default GardenTableRow;
