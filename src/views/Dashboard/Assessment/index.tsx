import { Text, VStack, HStack, Button } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import ethers from "ethers";
import IBabController from "./IBabController.json";

export default function Assessment() {
  const { active, library } = useWeb3React();
  const history = useHistory();

  function getControllerContract() {
    const contractAddress = "0xD4a5b5fcB561dAF3aDF86F8477555B92FBa43b5F";

    const controllerContract = new ethers.Contract(
      contractAddress,
      IBabController.abi,
      library.provider
    );

    return controllerContract;
  }

  return (
    <VStack justifyContent="center" alignItems="center" h="100vh">
      <HStack>
        <Button
          onClick={() => {
            getControllerContract();
          }}
        >
          Get Controller Contract
        </Button>
      </HStack>

      <HStack>
        {!active ? (
          <Button onClick={() => history.push("/admin/connect")}>
            Connect Wallet
          </Button>
        ) : (
          <Text>Connected</Text>
        )}
      </HStack>
    </VStack>
  );
}
