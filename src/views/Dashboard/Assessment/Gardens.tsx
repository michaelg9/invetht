import {
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import { GardenDataType } from "./data";
import GardenTableRow from "./GardenTableRow";

export default function Gardens({
  title,
  captions,
  data,
}: {
  title: string;
  captions: string[];
  data: GardenDataType[];
}) {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="12px 0px 28px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <Table variant="simple" color={textColor}>
        <Thead>
          <Tr my=".8rem" ps="0px">
            {captions.map((caption, idx) => {
              return (
                <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : undefined}>
                  {caption}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => {
            return (
              <GardenTableRow key={row.name} name={row.name} logo={row.logo} />
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
