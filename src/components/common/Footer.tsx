import React from "react";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      textAlign="center"
      w={"100%"}
      py={3}
      bg="brand.primary"
      display="flex"
      alignItems="center"
      justifyContent={{ base: "center", md1: "space-between" }}
      color={"white"}
    >
      <VStack
        my={{ base: 0, md1: 6 }}
        mx={"auto"}
        alignItems={"center"}
        display="flex"
        flexDirection="column"
        spacing={4}
      >
        <Flex
          alignItems={"center"}
          gap={{ base: 4, md1: 8 }}
          flexDir={{ base: "column", md1: "row" }}
        >
          {" "}
          <Link fontSize={12} href="/terms-and-conditions" mx="10px">
            Termos e Condições
          </Link>
          <Link fontSize={12} href="/privacy-policy" mx="10px">
            Política de Privacidade
          </Link>
          <Flex display={{ base: "flex", md1: "none" }} flex={3}>
            <Link fontSize={12} href="/terms-and-conditions" mx="10px">
              Termos e Condições
            </Link>
            <Link fontSize={12} href="/privacy-policy" mx="10px">
              Política de Privacidade
            </Link>
          </Flex>
          <Text
            display={{ base: "none", md1: "inline" }}
            fontSize={12}
            flex={2}
          >
            <strong>Aposta Premia</strong> - Todos os direitos reservados © 2025
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Footer;
