import { Text, Flex, HStack, Button } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import {
  IBabController,
  IGarden,
  IERC20Metadata,
  ICoreGarden,
  IAdminGarden,
  IStrategyGarden,
} from "./interfaces";
import { useState } from "react";
import { getGardenData } from "./data";

export default function Assessment() {
  const { active, library } = useWeb3React();
  const history = useHistory();
  const [controller, setController] = useState<null | ethers.Contract>(null);
  const [gardens, setGardens] = useState<object[]>([]);

  function getControllerContract() {
    const contractAddress = "0xD4a5b5fcB561dAF3aDF86F8477555B92FBa43b5F";

    const signer = library.getSigner();

    const controllerContract = new ethers.Contract(
      contractAddress,
      IBabController.abi,
      signer
    );

    console.log({ controllerContract });
    setController(controllerContract);

    return controllerContract;
  }

  async function getGardens() {
    const gardenAdresses = await controller!.getGardens();

    const allGardenData = [];

    for (const gardenAddress of gardenAdresses.slice(0, 1)) {
      const gardenContract = new ethers.Contract(
        gardenAddress,
        [
          ...IGarden.abi,
          ...IERC20Metadata.abi,
          ...ICoreGarden.abi,
          ...IAdminGarden.abi,
          ...IStrategyGarden.abi,
        ],
        library.getSigner()
      );

      const gardenData = await getGardenData(gardenContract);

      allGardenData.push({ ...gardenData, address: gardenAddress });
    }

    console.log({ allGardenData });
    setGardens(allGardenData);

    return allGardenData;
  }

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <HStack>
        {!active ? (
          <Button onClick={() => history.push("/admin/connect")}>
            Connect Wallet and come back
          </Button>
        ) : (
          <Text>Wallet connected</Text>
        )}
      </HStack>

      <HStack mt={"3rem"}>
        {!controller ? (
          <Button onClick={getControllerContract} disabled={!active}>
            Get Controller Contract
          </Button>
        ) : (
          <Text>Controller Contract loaded</Text>
        )}
      </HStack>

      <HStack mt="3rem">
        {!gardens.length ? (
          <Button onClick={getGardens} disabled={!active || !controller}>
            Get Gardens
          </Button>
        ) : (
          <Text>Gardens loaded</Text>
        )}
      </HStack>
    </Flex>
  );
}
