import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

interface LoadProps {
  isLoading: boolean;
}

const Load: React.FC<LoadProps> = ({ isLoading }) => {
  return (
    <Box
      display={isLoading ? "flex" : "none"}
      bg="rgba(141, 141, 141, 0.322)"
      color="primary"
      minH="100vh"
      w={"100%"}
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      zIndex="0"
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default Load;
