import { Box, Button, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getGardensByRiskProfile,
  GardenDataType,
  getGardenData,
  calculateRiskProfile,
} from "./data";
import Gardens from "./Gardens";
import {
  IAdminGarden,
  IBabController,
  ICoreGarden,
  IERC20Metadata,
  IGarden,
  IStrategyGarden,
} from "./interfaces";

function getControllerContract(library: any) {
  const contractAddress = "0xD4a5b5fcB561dAF3aDF86F8477555B92FBa43b5F";

  const signer = library.getSigner();

  const controllerContract = new ethers.Contract(
    contractAddress,
    IBabController.abi,
    signer
  );
  return controllerContract;
}

async function getGardens(
  library: any,
  riskProfile?: number,
) {
  const allGardenData = [];
  // const controller = getControllerContract(library);
  // const gardenAddresses = await controller.getGardens();
  const selectedGardenAddresses = getGardensByRiskProfile(riskProfile);

  for (const gardenAddress of selectedGardenAddresses) {
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

    const gardenData = await getGardenData(gardenContract, library);

    allGardenData.push({ ...gardenData });
  }

  return allGardenData;
}

function Explore() {
  const { active, library } = useWeb3React();
  const [gardens, setGardens] = useState<GardenDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    if (!active) return;

    async function load() {
      setLoading(true);
      try {
        setGardens(await getGardens(library));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [active, library]);

  if (!active) {
    return (
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <Text fontSize="2xl">No connected wallet found.</Text>
        <Box>
          <Button
            variant="outline"
            onClick={() => history.push("/admin/connect")}
          >
            Please connect first!
          </Button>
        </Box>
      </Flex>
    );
  } else if (loading) {
    return (
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <HStack mt="3rem">
        {!gardens ? (
          <Text>No options found</Text>
        ) : (
          <Gardens
            title="Explore"
            captions={["Vault Name", "Token", "Price", "Net Asset Value", "Total Supply"]}
            data={gardens}
          />
        )}
      </HStack>
    </Flex>
  );
}

export {
  getControllerContract,
  getGardens,
  calculateRiskProfile,
  Explore as default,
};
