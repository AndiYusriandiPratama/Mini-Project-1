import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Image,
  Input,
  InputGroup,
  useMediaQuery,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { format } from "https://cdn.skypack.dev/date-fns";
import ModalBox from "./ModalBox";

function MainPage() {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLargerThan768, isLargerThan480] = useMediaQuery([
    "(min-width: 768px)",
    "(min-width: 480px)",
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/events")
      .then((response) => {
        setData(response.data);

        const limitedData = response.data.slice(0, 20);
        setDisplayedData(limitedData);
      })
      .catch((err) => {
        console.log("error fetch", err);
      });
  }, []);

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedData(filteredData);
  }, [searchQuery, data]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = displayedData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedData(filteredData);
  };

  const handleModalOpen = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  const gridColumn = isLargerThan768 ? 4 : isLargerThan480 ? 3 : 2; // Menentukan jumlah kolom tergantung pada resolusi layar

  const imageHeight = isLargerThan768
    ? "300px"
    : isLargerThan480
    ? "250px"
    : "150px";

  return (
    <Box p={4} justify="center" align="center">
      <form onSubmit={handleSearch}>
        <InputGroup
          marginTop={30}
          w={isLargerThan768 ? "30%" : "50%"}
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius="full"
          p={2}
        >
          <Input
            type="text"
            placeholder="Cari produk..."
            size="lg"
            position="relative"
            borderRadius="full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </form>

      <SimpleGrid
        columns={[1, 2, gridColumn, 4]}
        spacing={9}
        marginX={5}
        marginY={10}
      >
        {displayedData.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            bg="white"
            mx="auto"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Image
              src={item.img}
              alt={item.title}
              h={imageHeight}
              w="100%"
              objectFit="cover"
            />
            <Box p="4">
              <Text
                fontSize={isLargerThan768 ? "xl" : "lg"}
                fontWeight="bold"
                mb={2}
              >
                {item.title} - {item.location}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" color="teal.500">
                <TimeIcon />{" "}
                {format(
                  new Date(`${item.date} ${item.time}`),
                  "EEE, MMM d, h:mm a"
                )}
              </Text>
              <Button
                colorScheme="teal"
                mt={4}
                size={isLargerThan768 ? "md" : "sm"}
                borderRadius="full"
                onClick={() => handleModalOpen(item)}
              >
                Detail
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <ModalBox
        isOpen={modalOpen}
        onClose={handleModalClose}
        event={selectedEvent}
      />
    </Box>
  );
}

export default MainPage;
