import {
  Box,
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      backgroundColor="teal.500"
      color="white"
    >
      <Box>
        <Link fontSize="xl" fontWeight="bold" href="/">
          7 Shop
        </Link>
      </Box>

      <form onSubmit={handleSubmit}>
        {" "}
        <InputGroup w="70%">
          <Input
            type="text"
            placeholder="Cari produk..."
            size="md"
            borderRadius="full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputRightElement width="4rem">
            <Button type="submit" h="1.65rem" size="sm">
              {" "}
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>

      <Spacer />

      <Box>
        <Link marginRight="1rem" href="/find-events">
          Find Events
        </Link>
        <Link marginRight="1rem" href="/create-events">
          Create Events
        </Link>
        <Link marginRight="1rem" href="#">
          Login
        </Link>
        <Link marginRight="1rem" href="#">
          SignUp
        </Link>
        <Link href="#">Keranjang</Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
