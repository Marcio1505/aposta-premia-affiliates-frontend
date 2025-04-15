import {
  Box,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
  Text,
  Center,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function NotFound() {
  return (
    <div>
      <div style={{ maxWidth: "95%", margin: "0 auto" }}>
        <Box minH="auto" minW="" maxW="100vw">
          <Center minH="50vh" flexDirection="column">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Página Não Encontrada (404)
            </Text>
            <Text fontSize="lg" mb={6}>
              A página que você está procurando não foi encontrada, mas você
              pode fazer uma busca e encontrar as melhores promoções no nosso
              site!
            </Text>

            <HStack gap="10" width="full">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <IoIosSearch />
                </InputLeftElement>
                <Input placeholder="Buscar promoções..." />
              </InputGroup>
            </HStack>
          </Center>
        </Box>
      </div>
    </div>
  );
}
