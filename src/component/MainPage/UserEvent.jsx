import { Box } from "@chakra-ui/react";
import { color } from "framer-motion";

const UserEvent = () => {
  return (
    <div>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          backgroundColor: "grey",
        }}
      >
        <h1>My Event</h1>
      </Box>
    </div>
  );
};

export default UserEvent;
