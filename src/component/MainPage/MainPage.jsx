import { useState, useEffect } from "react";
import axios from "axios";
import { Box, SimpleGrid, Text, Button, Image } from "@chakra-ui/react";
import Navbar from "../Navbar/navbar"; // Pastikan Anda mengganti ini dengan lokasi file Navbar yang benar

function MainPage() {
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Tambahkan state untuk searchQuery

  useEffect(() => {
    // Fetch Data
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log("error fetch", err);
      });
  }, []);

  const handleSearch = () => {
    // Lakukan pencarian berdasarkan searchQuery
    const result = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Simpan hasil pencarian ke dalam state searchResults
    setSearchResults(result);
  };

  return (
    <Box p={4}>
      <Navbar onSearch={(query) => setSearchQuery(query)} />{" "}
      {/* Menggunakan Navbar dan menetapkan searchQuery */}
      <h1>Data dari API:</h1>
      <SimpleGrid columns={4} spacing={4}>
        {(searchQuery ? searchResults : data).map(
          (
            item // Menggunakan searchResults jika ada searchQuery
          ) => (
            <Box
              key={item.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
            >
              <Image
                src={item.category.image}
                alt={item.title}
                h="200px"
                w="100%"
              />
              <Box p="4">
                <Text fontSize="lg" fontWeight="bold">
                  {item.title}
                </Text>
                <Text fontSize="xl" mt={2}>
                  $ {item.price}
                </Text>
                <Button colorScheme="blue" mt={4} size="sm">
                  Detail
                </Button>
              </Box>
            </Box>
          )
        )}
      </SimpleGrid>
    </Box>
  );
}

export default MainPage;
