import {
  Box,
  Flex,
  Spacer,
  Link,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bgGradient="linear(to-r, teal.400, blue.500)"
      color="white"
    >
      <Box marginRight="10">
        <Link fontSize="xl" fontWeight="bold" href="/" marginLeft="60px">
          <b>7</b> event
        </Link>
      </Box>

      <Spacer />

      <Box display={{ base: "none", md: "block" }} marginRight="40px">
        <Link marginRight="1rem" href="/find-events">
          Find Events
        </Link>
        <Link marginRight="1rem" href="/create-events">
          Create Events
        </Link>
        <Link marginRight="1rem" href="/login">
          Login
        </Link>
        <Link marginRight="1rem" href="/register">
          Sign Up
        </Link>
        <Link marginRight="1rem" href="/user-event">
          My Event
        </Link>
      </Box>

      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        display={{ base: "block", md: "none" }}
        onClick={onToggle}
      />

      <Box
        display={isOpen ? "block" : "none"}
        position="absolute"
        top="60px"
        right="0"
        bgGradient="linear(to-r, teal.400, blue.500)"
        borderRadius="5%"
        padding="1rem"
        boxShadow="-moz-initial"
      >
        <Link
          display="block"
          color="white"
          marginBottom="0.5rem"
          href="/find-events"
        >
          Find Events
        </Link>
        <Link
          display="block"
          color="white"
          marginBottom="0.5rem"
          href="/create-events"
        >
          Create Events
        </Link>
        <Link display="block" color="white" marginBottom="0.5rem" href="/login">
          Login
        </Link>
        <Link
          display="block"
          color="white"
          marginBottom="0.5rem"
          href="/register"
        >
          Sign Up
        </Link>
        <Link display="block" color="white" href="/user-event">
          My Event
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
