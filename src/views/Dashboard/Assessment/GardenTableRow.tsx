import { Flex, Icon, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function GardenTableRow(props: { logo: string; name: string }) {
  const { logo, name } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Icon as={logo} h={"24px"} w={"24px"} pe="5px" />
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>
    </Tr>
  );
}

export default GardenTableRow;
