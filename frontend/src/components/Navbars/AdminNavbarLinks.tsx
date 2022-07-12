import { BellIcon, Icon } from "@chakra-ui/icons";
import { FaWallet } from "react-icons/fa";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  Tooltip
} from "@chakra-ui/react";
import avatar1 from "assets/img/avatars/avatar1.png";
import { SettingsIcon } from "components/Icons/Icons";
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import { useWeb3React } from "@web3-react/core";
import routes from "routes";
import connectors from "ether/connectors";
import { useHistory } from "react-router-dom";

interface HeaderLinksProps {
  variant: string,
  fixed: boolean,
  secondary: boolean,
  onOpen: VoidFunction,
  logoText: string,
  children: React.ReactElement
}

export default function HeaderLinks({ variant, children, fixed, secondary, onOpen, ...rest }: HeaderLinksProps) {
  const {
    account,
    activate,
    active,
  } = useWeb3React();
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  const history = useHistory();
  if (secondary) {
    navbarIcon = "white";
  }
  function onClickWallet() {
    const provider = window.localStorage.getItem("provider") as keyof typeof connectors;
    if (provider && !active) activate(connectors[provider]);
    else {
      history.push('/admin/connect')
    }
  }
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <SidebarResponsive
        secondary={secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
      <Tooltip placement="left" label={account} shouldWrapChildren>
        <Icon
          onClick={onClickWallet}
          cursor="pointer"
          me="16px"
          ms={{ base: "16px", xl: "0px" }}
          color={ active ? "green" : navbarIcon }
          w="18px"
          h="18px"
          as={FaWallet}
        />
      </Tooltip>
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar1}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
