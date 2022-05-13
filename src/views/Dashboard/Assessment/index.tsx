import { Text, VStack, HStack, Button } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import IBabController from "./IBabController.json";
import { useState } from "react";

export default function Assessment() {
  const { active, library } = useWeb3React();
  const history = useHistory();
  const [controller, setController] = useState<null | ethers.Contract>(null);

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
    const gardens = await controller!.getGardens();

    console.log({ gardens });
  }

  return (
    <VStack justifyContent="center" alignItems="center" h="100vh">
      <HStack>
        {!active ? (
          <Button onClick={() => history.push("/admin/connect")}>
            Connect Wallet
          </Button>
        ) : (
          <Text>Connected</Text>
        )}
      </HStack>

      <HStack>
        <Button onClick={getControllerContract} disabled={!active}>
          Get Controller Contract
        </Button>
      </HStack>

      <HStack>
        <Button onClick={getGardens} disabled={!active || !controller}>
          Get Gardens
        </Button>
      </HStack>
    </VStack>
  );
}
