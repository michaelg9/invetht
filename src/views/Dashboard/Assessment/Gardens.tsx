import {
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import { GardenDataType } from "./data";
import GardenTableRow from "./GardenTableRow";

export default function Gardens({
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
