import {
  Flex,
  Progress,
  StatHelpText,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

export interface DashboardTableRowProps {
  logo: React.ReactElement;
  name: string;
  diff1h: number;
  diff7d: number;
  diff30d: number;
  value: number;
  weight: number;
  balance: number;
  symbol: string;
  currency: string;
}

function DashboardTableRow({
  logo,
  name,
  diff1h,
  diff7d,
  diff30d,
  value,
  weight,
  balance,
  currency,
  symbol,
}: DashboardTableRowProps) {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          {logo}
          <Text
            fontSize="md"
            marginLeft={"3px"}
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text
            fontSize="md"
            color="teal.300"
            fontWeight="bold"
            pb=".2rem"
          >{`${(weight * 100).toFixed(2)}%`}</Text>
          <Progress
            colorScheme={weight === 100 ? "teal" : "cyan"}
            size="xs"
            value={weight}
            borderRadius="15px"
          />
        </Flex>
      </Td>
      {[diff1h, diff7d, diff30d].map((diff, idx) => (
        <Td key={idx}>
          <StatHelpText
            alignSelf="flex-end"
            justifySelf="flex-end"
            m="0px"
            color={diff > 0 ? "green.400" : "red.400"}
            fontWeight="bold"
            pb=".5rem"
            fontSize="md"
          >
            {diff &&
              (diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(2)}%`)}
          </StatHelpText>
        </Td>
      ))}
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {balance.toFixed(3)} {symbol}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {`${value.toFixed(2)}`} {currency}
        </Text>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
