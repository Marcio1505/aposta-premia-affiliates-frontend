import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  Button,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import "chart.js/auto";
import { notFound, restart } from "../../assets";
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoIosTime,
} from "react-icons/io";

// Mock data for payments
const mockPayments = [
  {
    date: "2023-10-01",
    status: "Pendente",
    amount: "R$ 100,00",
  },
  {
    date: "2023-10-05",
    status: "Recebido",
    amount: "R$ 200,00",
  },
  {
    date: "2023-10-10",
    status: "Negado",
    amount: "R$ 300,00",
  },
];

export default function Payments() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPayments, setFilteredPayments] = useState(mockPayments);

  const handleSearch = () => {
    const filtered = mockPayments?.filter((payment) => {
      const paymentDate = new Date(payment.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || paymentDate >= start) && (!end || paymentDate <= end);
    });
    setFilteredPayments(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Recebido":
        return <IoIosCheckmarkCircle color="white" />;
      case "Pendente":
        return <IoIosTime color="white" />;
      case "Negado":
        return <IoIosCloseCircle color="white" />;
      default:
        return null;
    }
  };

  return (
    <VStack p={4} w={"100%"} alignItems={"stretch"} minH={"99vh"}>
      <Heading mb={6} mt={1} color={"primary"} textAlign="start" fontSize="xl">
        Historico de pagamentos
      </Heading>
      <Box mb={6}>
        <Flex gap={4} flexWrap="wrap" alignItems={"center"}>
          <Heading size="sm" color={"primary"}>
            Ver por periodo
          </Heading>
          <Box>
            <Input
              type="date"
              value={startDate}
              maxW={20}
              color={"primary"}
              borderRadius={" 8px 0  0  8px"}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Data Inicial"
              borderColor={"primary"}
              _hover={{ borderColor: "primary" }}
              flex="1"
              minW="160px"
            />

            <Input
              type="date"
              maxW={17}
              value={endDate}
              borderLeft={"none"}
              borderRadius={"0 8px 8px 0"}
              color={"primary"}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Data Final"
              borderColor={"primary"}
              _hover={{ borderColor: "primary" }}
              flex="1"
              minW="160px"
            />
          </Box>
          <Button variant={"button"} mt={"auto"} onClick={handleSearch}>
            <Image src={restart} mr={1.5} /> Atualizar
          </Button>
        </Flex>
      </Box>
      {/* Payments List Section */}
      {filteredPayments.length >= 1 && (
        <Box
          bg={"white"}
          p={3}
          borderRadius={"15"}
          border={"1px solid #d6d6d6"}
          shadow={"none"}
        >
          <Box>
            <Box
              as="table"
              w="100%"
              mb={4}
              borderBottom="1px solid #d6d6d6"
              borderRadius="8px"
            >
              <Box as="thead" borderBottom={"1px solid #d6d6d6"}>
                <Box as="tr">
                  <Box as="th" p={2} textAlign="left">
                    Valor
                  </Box>
                  <Box as="th" p={2} textAlign="left">
                    Data
                  </Box>
                  <Box as="th" p={2} textAlign="left">
                    Status
                  </Box>
                </Box>
              </Box>
              <Box as="tbody">
                {filteredPayments.map((payment, index) => (
                  <Box as="tr" key={index} borderBottom="1px solid #d6d6d6">
                    <Box as="td" p={2}>
                      {payment.amount}
                    </Box>
                    <Box as="td" p={2}>
                      {new Date(payment.date).toLocaleDateString("pt-BR")}
                    </Box>
                    <Box as="td" p={2}>
                      <Flex
                        alignItems="center"
                        gap={2}
                        bg={"primary"}
                        w={130}
                        justifyContent={"space-between"}
                        px={3}
                        borderRadius={50}
                        color={"white"}
                      >
                        {getStatusIcon(payment.status)}
                        <Text w={81}>{payment.status}</Text>
                      </Flex>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {filteredPayments.length === 0 && (
        <VStack color={"#999"} h={"60vh"} justifyContent={"center"}>
          <Image src={notFound} />
          <Heading fontSize={"xl"} textAlign="center" p={4}>
            Nenhum resultado encontrado
          </Heading>
          <Text textAlign={"center"}>
            Tente inserir outras datas <br />
            para encontrar o que está buscando
          </Text>
        </VStack>
      )}
    </VStack>
  );
}
