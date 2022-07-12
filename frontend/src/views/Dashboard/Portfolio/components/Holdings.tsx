import {
  Flex,
  Icon,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import DashboardTableRow, { DashboardTableRowProps } from "./DashboardTableRow";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

interface HoldingsProps {
  title: string;
  amount?: string;
  captions: string[];
  data: DashboardTableRowProps[];
}

const Holdings = ({ title, amount, captions, data }: HoldingsProps) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="12px 0px 28px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
          {amount != null && (
            <Flex align="center">
              <Icon
                as={IoCheckmarkDoneCircleSharp}
                color="teal.300"
                w={4}
                h={4}
                pe="3px"
              />
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                <Text fontWeight="bold" as="span">
                  {amount} done
                </Text>{" "}
                this month.
              </Text>
            </Flex>
          )}
        </Flex>
      </CardHeader>
      <Table variant="simple" color={textColor}>
        <Thead>
          <Tr my=".8rem" ps="0px">
            {captions.map((caption, idx) => {
              return (
                <Th
                  color="gray.400"
                  key={idx}
                  ps={idx === 0 ? "0px" : undefined}
                >
                  {caption}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => {
            return (
              <DashboardTableRow
                key={row.name}
                {...row}
              />
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default Holdings;
