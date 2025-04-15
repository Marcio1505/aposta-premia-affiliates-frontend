import {
  Box,
  Heading,
  Input,
  Text,
  Button,
  Image,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import "chart.js/auto";
import { notFound } from "../../assets";
import { CiSearch } from "react-icons/ci";
// Mock data for payments
const mockPayments = [
  {
    type: "Lorem ipsum",
    descriptioon: "Lorem ipsum",
    amount: "R$ 100,00",
  },
  {
    type: "Lorem ipsum",
    descriptioon: "Lorem ipsum",
    amount: "R$ 200,00",
  },
  {
    type: "Lorem ipsum",
    descriptioon: "Lorem ipsum",
    amount: "R$ 300,00",
  },
];

export default function Payments() {
  const [searchText, setSearchText] = useState("");
  const [filteredPayments, setFilteredPayments] = useState(mockPayments);

  const handleSearch = () => {
    const filtered = mockPayments.filter((payment) =>
      payment.descriptioon.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPayments(filtered);
  };

  return (
    <VStack p={4} w={"100%"} alignItems={"stretch"} minH={"99vh"}>
      <Heading mb={6} mt={1} color={"primary"} textAlign="start" fontSize="xl">
        Historico de pagamentos
      </Heading>
      <Box mb={1}>
        <Box position="relative" w="100%">
          <Input
            type="text"
            value={searchText}
            w={"full"}
            color={"primary"}
            borderRadius={"8px"}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Pesquisar"
            borderColor={"#d6d6d6"}
            _hover={{ borderColor: "primary" }}
            flex="1"
          />
          <Button
            position="absolute"
            right="8px"
            top="50%"
            transform="translateY(-50%)"
            variant="unstyled"
            onClick={handleSearch}
          >
            <CiSearch size={20} color="gray" />
          </Button>
        </Box>
      </Box>
      <Text color={"#a5a5a5"}>
        Pesquise por tipo de comissão, descrição ou valor
      </Text>
      {/* Payments List Section */}
      {filteredPayments.length >= 1 && (
        <Box
          bg={"white"}
          p={2}
          borderRadius={"15"}
          border={"1px solid #d6d6d6"}
          shadow={"none"}
        >
          <VStack alignItems={"start"} p={2}>
            <Text>Plano de comissão padrão</Text>
            <Divider />
            <Box
              as="table"
              w="100%"
              mb={4}
              borderBottom="1px solid #d6d6d6"
              borderRadius="8px"
            >
              <Box as="thead" borderBottom={"1px solid #d6d6d6"}>
                <Box as="tr">
                  <Box as="th" p={2} textAlign="center">
                    Tipo de Comissção
                  </Box>
                  <Box as="th" p={2} textAlign="center">
                    Descrição
                  </Box>
                  <Box as="th" p={2} textAlign="center">
                    Valor
                  </Box>
                </Box>
              </Box>
              <Box as="tbody">
                {filteredPayments.map((payment, index) => (
                  <Box
                    as="tr"
                    textAlign={"center"}
                    key={index}
                    borderBottom="1px solid #d6d6d6"
                  >
                    <Box as="td" p={2}>
                      {payment.type}
                    </Box>
                    <Box as="td" p={2}>
                      {payment.descriptioon}
                    </Box>
                    <Box as="td" p={2}>
                      <Text mx={"auto"} w={81}>
                        {payment.amount}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </VStack>
        </Box>
      )}
      {filteredPayments.length === 0 && (
        <VStack color={"#999"} h={"60vh"} justifyContent={"center"}>
          <Image src={notFound} />
          <Heading fontSize={"xl"} textAlign="center" p={4}>
            Nenhum resultado encontrado
          </Heading>
          <Text textAlign={"center"}>
            Tente inserir outro texto <br />
            para encontrar o que está buscando
          </Text>
        </VStack>
      )}
    </VStack>
  );
}
