import { Text, Flex, HStack, Spinner } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import {
  IBabController,
  IGarden,
  IERC20Metadata,
  ICoreGarden,
  IAdminGarden,
  IStrategyGarden,
} from "./interfaces";
import { useEffect, useState } from "react";
import { COOL_GARDENS, GardenDataType, getGardenData } from "./data";
import Gardens from "./Gardens";

function getControllerContract(library: any) {
  const contractAddress = "0xD4a5b5fcB561dAF3aDF86F8477555B92FBa43b5F";

  const signer = library.getSigner();

  const controllerContract = new ethers.Contract(
    contractAddress,
    IBabController.abi,
    signer
  );
  // console.log({ controllerContract });
  return controllerContract;
}

async function getGardens(_controller: ethers.Contract, library: any) {
  const allGardenData = [];
  // const gardenAddresses = await controller.getGardens();
  const selectedGardenAddresses = COOL_GARDENS; // TODO: For now just load the first few gardens
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

    const gardenData = await getGardenData(gardenContract);

    allGardenData.push({ ...gardenData, address: gardenAddress });
  }

  // console.log({ allGardenData });
  return allGardenData;
}

export default function Assessment() {
  const { active, library } = useWeb3React();
  const [gardens, setGardens] = useState<GardenDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!active) return;
    async function load() {
      setLoading(true);
      try {
        const controller = getControllerContract(library);
        setGardens(await getGardens(controller, library));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [active, library]);

  if (!active) {
    return (
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <div>No connected wallet found</div>
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
            captions={["Vault Name", "Net Asset Value", "90D", "30D", "APY"]}
            data={gardens}
          />
        )}
      </HStack>
    </Flex>
  );
}
