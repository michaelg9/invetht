import {
  Flex,
  Image,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { formatUnits, GardenDataType } from "./data";

interface GardenTableRowProps {
  data: GardenDataType;
}

function GardenTableRow({ data }: GardenTableRowProps) {
  const {
    lastPricePerShare,
    address,
    totalSupply,
    symbol,
    reserveAssetSymbol,
    nav,
  } = data;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Image
            src={`https://www.babylon.finance/gardens/${address}/thumb.png`}
            h={"40px"}
            w={"40px"}
            pe="5px"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "./assets/invest.svg";
            }}
          />
          <Link
            href={`https://www.babylon.finance/garden/${address}`}
            target="_blank"
            lineHeight="100%"
          >
            <Text
              fontSize="md"
              decoration={"underline"}
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {data.name}
            </Text>
          </Link>
        </Flex>
      </Td>
      <Td>
        <Link
          href={`https://etherscan.io/token/${address}`}
          target="_blank"
          lineHeight="100%"
        >
          <Text
            fontSize="md"
            decoration={"underline"}
            color={textColor}
            minWidth="100%"
          >
            {symbol}
          </Text>
        </Link>
      </Td>
      <Td>{`${formatUnits(lastPricePerShare)} ${reserveAssetSymbol}`}</Td>
      <Td>{`${formatUnits(nav, 32, 36)} ${reserveAssetSymbol}`}</Td>
      <Td>{formatUnits(totalSupply, 17)}</Td>
    </Tr>
  );
}

export default GardenTableRow;
