import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  Button,
  Image,
  HStack,
  VStack,
  Select,
  useToast, // Import useToast
} from "@chakra-ui/react";
import { useState } from "react";
import "chart.js/auto";
import { copy, notFound, restart } from "../../assets";
import { LuArrowUpRight } from "react-icons/lu"; // Ensure this is the correct library

// Mock data for postbackslogs
const mockPostbacksLogs = [
  {
    date: "2023-10-01",
    type: "Postback de Registro",
    code: "https://example.com/postback1",
    status: "400 FAILED",
    response: '{"status":"error","msg":"ac..."}',
  },
  {
    date: "2023-10-05",
    type: "Postback de Registro",
    code: "https://example.com/postback1",
    status: "200 OK",
    response: '{"status":"success","msg":"ac..."}',
  },
  {
    date: "2023-10-10",
    type: "Postback de Registro",
    code: "https://example.com/postback1",
    status: "200 OK",
    response: '{"status":"success","msg":"ac..."}',
  },
];

export default function PostbacksLogs() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPostbacksLogs, setFilteredPostbacksLogs] =
    useState(mockPostbacksLogs);

  const toast = useToast(); // Initialize useToast

  const handleSearch = () => {
    const filtered = mockPostbacksLogs?.filter((postback) => {
      const postbackDate = new Date(postback.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || postbackDate >= start) && (!end || postbackDate <= end);
    });
    setFilteredPostbacksLogs(filtered);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack p={4} w={"100%"} alignItems={"stretch"} minH={"99vh"}>
      <Heading mb={6} mt={1} color={"primary"} textAlign="start" fontSize="xl">
        Log do Postback
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

      {/* PostbacksLogs List Section */}
      {filteredPostbacksLogs.length >= 1 && (
        <Box
          bg={"white"}
          p={4}
          borderRadius={"15"}
          border={"1px solid #d6d6d6"}
          shadow={"none"}
        >
          <HStack mb={4} justifyContent={"space-between"}>
            <Heading fontSize={"xl"}>Melhor desempenho</Heading>
            <Button fontSize={"lg"} variant={"link"} size="sm">
              Ver todos <LuArrowUpRight size={22} />
            </Button>
          </HStack>
          <Box overflowX="auto">
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
                    Data e hora
                  </Box>
                  <Box as="th" p={2} textAlign="center">
                    Tipo de Postback
                  </Box>
                  <Box as="th" p={2} textAlign="center">
                    Código do Postback
                  </Box>
                  <Box as="th" p={2} textAlign="center">
                    Status
                  </Box>
                  <Box as="th" p={2} textAlign="center">
                    Resposta
                  </Box>
                </Box>
              </Box>
              <Box as="tbody">
                {filteredPostbacksLogs.map((postback, index) => (
                  <Box as="tr" key={index} borderBottom="1px solid #d6d6d6">
                    <Box as="td" textAlign="center" p={2}>
                      {postback.date}
                    </Box>
                    <Box as="td" textAlign="center" p={2}>
                      {postback.type}
                    </Box>
                    <HStack as="td" textAlign="center" p={2}>
                      <Text
                        as="span"
                        title={postback.code} // Show full code on hover
                      >
                        {postback.code.length > 25
                          ? `${postback.code.substring(0, 25)}...`
                          : postback.code}
                      </Text>
                      <Button
                        variant={"link"}
                        size="sm"
                        color={"primary"}
                        onClick={() => handleCopy(postback.code)} // Use handleCopy
                      >
                        <Image src={copy} boxSize={5} />
                      </Button>
                    </HStack>
                    <Box as="td" p={2}>
                      <Flex
                        alignItems="center"
                        gap={2}
                        mx={"auto"}
                        bg={
                          postback.status === "200 OK" ? "green.300" : "red.500"
                        }
                        w={130}
                        justifyContent={"space-between"}
                        px={3}
                        borderRadius={50}
                        color={"white"}
                      >
                        <Text mx={"auto"} textAlign={"center"} w={"auto"}>
                          {postback.status}
                        </Text>
                      </Flex>
                    </Box>
                    <Text
                      as="td"
                      mx={"auto"}
                      textAlign="center"
                      w={"auto"}
                      title={postback.response} // Show full response on hover
                    >
                      {postback.response.length > 25
                        ? `${postback.response.substring(0, 25)}...`
                        : postback.response}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <HStack
            fontWeight={"bold"}
            fontSize={"sm"}
            justify={"space-between"}
            mt={4}
          >
            <HStack fontWeight={"bold"} fontSize={"sm"} color={"primary"}>
              <Text>Itens por página</Text>
              <Select
                w="auto"
                ml={2}
                onChange={(e) => console.log(e.target.value)} // Replace with your handler
                defaultValue="10"
                variant={"unstyled"}
                fontWeight={"bold"}
              >
                <Box as="option" value="5">
                  5
                </Box>
                <Box as="option" value="10">
                  10
                </Box>
                <Box as="option" value="15">
                  15
                </Box>
                <Box as="option" value="20">
                  20
                </Box>
              </Select>
              <Text color="black" fontWeight={"normal"}>
                1 - 10 de 5 itens
              </Text>
            </HStack>
            <HStack>
              <Select
                w="auto"
                ml={2}
                onChange={(e) => console.log(e.target.value)}
                defaultValue="10"
                variant={"unstyled"}
                fontWeight={"bold"}
              >
                <Box as="option" value="1">
                  1
                </Box>
                <Box as="option" value="2">
                  2
                </Box>
                <Box as="option" value="3">
                  3
                </Box>
                <Box as="option" value="4">
                  4
                </Box>
              </Select>
              <Text color="black" fontWeight={"normal"}>
                1 - 4 de 4 pagina(s)
              </Text>
            </HStack>
          </HStack>
        </Box>
      )}
      {filteredPostbacksLogs.length === 0 && (
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
