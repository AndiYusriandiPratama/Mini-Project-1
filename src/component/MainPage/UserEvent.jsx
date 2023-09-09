import React, { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";

const UserEvent = ({ event, onDelete }) => {
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Mengambil data event dari URL yang sesuai dengan event ID
    axios
      .get(`http://localhost:8001/events/${event.id}`)
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, [event.id]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {eventData.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <Box>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            border="1px solid #ccc"
            borderRadius="md"
            p="4"
            m="4"
            maxW="300px"
          >
            <Image
              src={item.img}
              alt={item.name}
              boxSize="150px"
              objectFit="cover"
            />
            <Box mt="2">
              <Text fontSize="xl" fontWeight="bold">
                {item.name}
              </Text>
              <Text fontSize="sm">{item.date}</Text>
            </Box>
            <Button
              mt="2"
              colorScheme="red"
              onClick={() => onDelete(eventData)}
            >
              Hapus
            </Button>
          </Flex>
        </Box>
      ))}
    </div>
  );
};

export default UserEvent;
