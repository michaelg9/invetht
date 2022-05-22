import { Box, Flex, Text } from "@chakra-ui/react";
import NavButtons from "./NavButtons";
import { Card } from "./index";

export default function CrashReaction(props) {
  const { state } = props;

  function onCardClick(value) {
    state.onValueChange("valueMarketReaction", value);

    props.goToStep(props.currentStep + 1);
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={3} {...props} hideForward />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        <Text fontSize="2xl">
          Due to macroeconomic conditions, the entire crypto market goes down by
          45%.
        </Text>
        <Text fontSize="2xl">What do you do?</Text>

        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Card
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="2rem 1rem 1rem 1rem"
            p="1rem"
            onClick={() => onCardClick(1)}
            active={state.valueMarketReaction === 1 ? 1 : 0}
          >
            <Text>
              Buy more, prices are cheap and it's a perfect buying opportunity
            </Text>
          </Card>

          <Card
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            p="1rem"
            onClick={() => onCardClick(2)}
            active={state.valueMarketReaction === 2 ? 1 : 0}
          >
            <Text>Hold. Prices will eventually recover.</Text>
          </Card>

          <Card
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            p="1rem"
            onClick={() => onCardClick(3)}
            active={state.valueMarketReaction === 3 ? 1 : 0}
          >
            <Text>
              Sell some of my assets. It can go lower and I want to take some
              funds from the market.
            </Text>
          </Card>

          <Card
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            p="1rem"
            onClick={() => onCardClick(4)}
            active={props.valueMarketReaction === 4}
          >
            <Text>
              Sell everything. Investing in cryptocurrency was a mistake.
            </Text>
          </Card>
        </Flex>
      </Box>
    </Flex>
  );
}
