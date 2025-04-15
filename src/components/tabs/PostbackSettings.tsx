import {
  Divider,
  Heading,
  Text,
  HStack,
  VStack,
  Image,
} from "@chakra-ui/react";
import { arrowsExchange } from "../../assets";

export default function PostbacksSettings() {
  return (
    <VStack p={4} w={"100%"} alignItems={"stretch"} minH={"99vh"}>
      <Heading mb={6} mt={1} color={"primary"} textAlign="start" fontSize="xl">
        Configurações do Postback
      </Heading>
      <HStack mb={6}>
        <VStack
          border="1px solid #d6d6d6"
          align={"start"}
          bg={"white"}
          p={4}
          borderRadius={12}
          minW={300}
          w={"30%"}
          spacing={5}
        >
          <Heading textAlign="start" fontSize="xl">
            Seus Postbacks
          </Heading>
          <Divider />
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Text> Postback de lead</Text>
          </HStack>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Text> Postback de registro</Text>{" "}
            <Text
              bg={"primary"}
              color={"white"}
              borderRadius={50}
              py={1}
              px={4}
              fontSize={12}
            >
              Ativo
            </Text>
          </HStack>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Text> Postback de FTD</Text>
            <Text
              bg={"primary"}
              color={"white"}
              borderRadius={50}
              py={1}
              px={4}
              fontSize={12}
            >
              Ativo
            </Text>
          </HStack>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Text> Postback de CPA Qualificado</Text>
          </HStack>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Text> Postback de comissões </Text>
          </HStack>
        </VStack>
        <VStack
          bg={"white"}
          w={"70%"}
          py={59}
          px={4}
          borderRadius={12}
          border="1px solid #d6d6d6"
          spacing={5}
        >
          <Image src={arrowsExchange} alt={""} />
          <Text fontWeight={1000} fontSize={18}>
            Comece selecionando uma URL de postback
          </Text>
          <Text fontSize={14} color={"gray.500"}>
            Crie ou edite o evento que você tem interesse em monitorar
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
