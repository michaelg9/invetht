import {
    Box,
    Center,
    Container,
    Flex,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text
} from "@chakra-ui/react";
import NavButtons from "./NavButtons";

export default function Goals(props) {
  const { state } = props;

  function onSliderChange(value) {
    state.onValueSliderChange("valueRiskProfile", value);
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={2} {...props} />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        <Text fontSize="2xl">What are your goals?</Text>

        <Flex>
          <Container
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex direction="column" alignItems="center" py="1rem">
              <Text fontSize="4rem">🐷</Text>

              <Text fontSize="2xl" mt="1rem">
                Conservative
              </Text>

              <Text mt="1rem">
                Stable and predictable returns. My money is always safe
                regardless of market volatility.
              </Text>
            </Flex>

            <Text align={"center"} mb="1rem">
              1 - 3
            </Text>
          </Container>

          <Container
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex direction="column" alignItems="center" py="1rem">
              <Text fontSize="4rem">🪴</Text>

              <Text fontSize="2xl" mt="1rem">
                Steady Growth
              </Text>

              <Text mt="1rem">
                I want to have exposure to crypto whilst minimizing risk. Long
                term focused, targeting constant growth YoY.
              </Text>
            </Flex>

            <Text align={"center"} mb="1rem">
              4 - 6
            </Text>
          </Container>

          <Container
            border="1px"
            borderRadius="xl"
            borderColor="teal.300"
            m="1rem"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex direction="column" alignItems="center" py="1rem">
              <Text fontSize="4rem">🚀</Text>

              <Text fontSize="2xl" mt="1rem">
                To the moon
              </Text>

              <Text mt="1rem">
                Targeting multiples for my portfolio. Ready for a 100x.
              </Text>
            </Flex>

            <Text align={"center"} mb="1rem">
              7 - 9
            </Text>
          </Container>
        </Flex>

        <Box mt="2rem">
          <Text fontSize="2xl">What is your risk profile?</Text>

          <Center mt="1rem">
            <Text>{state.valueRiskProfile ? state.valueRiskProfile : "-"}</Text>
          </Center>
          <Slider
            min={0}
            max={9}
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
