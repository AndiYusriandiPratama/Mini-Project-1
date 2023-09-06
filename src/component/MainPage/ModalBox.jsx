import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import styles from "./ModalBox.module.css";

const EventModal = ({ isOpen, onClose, event }) => {
  if (!event) {
    return null;
  }

  const modalWidth = event.description.length < 50 ? "400px" : "600px";
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalWidth}>
      <ModalOverlay />
      <ModalContent
        borderRadius="8px" // Menggunakan border-radius untuk sudut yang lebih lembut
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)" // Efek bayangan lembut
        bg="white" // Warna latar belakang modal
        color="black" // Warna teks dalam modal
        p="4rem" // Padding di dalam modal
        maxW="600px" // Lebar maksimum modal
        maxH="auto"
      >
        <ModalHeader>{event.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody borderBottom="1px solid #ccc" pb="1rem">
          <div className={styles.imgContainer}>
            <img
              src={event.img}
              alt={event.title}
              style={{ height: "300px", width: "200px", alignSelf: "center" }}
            />
          </div>

          <div>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Description:
            </p>
            <p>{event.description}</p>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Date:</p>
            <p>{event.date}</p>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Time:</p>
            <p>{event.time}</p>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Location:
            </p>
            <p>{event.location}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
