import {
  Box,
  Heading,
  Input,
  Button,
  Flex,
  VStack,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { EmailIcon, SearchIcon } from "@chakra-ui/icons";
import { useState, SetStateAction } from "react";
import { filter, restart, sort } from "../../assets";
import TableReportActivities from "./TableReportActivities";
import { LuArrowUpRight } from "react-icons/lu";

// Mock data for reports
// const mockReports = [
//   {
//     date: "2023-10-01",
//     impressions: 1000,
//     visitors: 500,
//     registrations: 50,
//     ftd: 10,
//     deposits: 5,
//     commission: "R$ 100,00",
//   },
//   {
//     date: "2023-10-05",
//     impressions: 2000,
//     visitors: 1000,
//     registrations: 100,
//     ftd: 20,
//     deposits: 10,
//     commission: "R$ 200,00",
//   },
//   {
//     date: "2023-10-10",
//     impressions: 3000,
//     visitors: 1500,
//     registrations: 150,
//     ftd: 30,
//     deposits: 15,
//     commission: "R$ 300,00",
//   },
// ];

export default function ReportEarning() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [search, setSearch] = useState("");

  const handleSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  return (
    <Box p={4} w={"100%"}>
      <VStack w={"100%"} spacing={6} alignItems="strech">
        <Heading color={"primary"} textAlign="start" fontSize="xl">
          Relatório de Ganhos
        </Heading>

        <Box mb={6}>
          <Flex gap={4} flexWrap="wrap">
            <Flex gap={4} alignItems={"center"} flexWrap="wrap">
              <Heading size="sm" color={"primary"}>
                Ver por periodo
              </Heading>
              <Box>
                <Input
                  type="date"
                  value={startDate}
                  maxW={15}
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
                  maxW={15}
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
            </Flex>
            <Button variant={"text"} mt={"auto"} color={"primary"}>
              <Image src={filter} w={5} mr={1.5} /> Filtro
            </Button>
            <Button variant={"text"} mt={"auto"} color={"primary"}>
              <Image src={sort} w={5} mr={1.5} />
              Classificação
            </Button>
            <Button variant={"button"} mt={"auto"}>
              <Image src={restart} mr={1.5} /> Atualizar
            </Button>
          </Flex>
        </Box>
      </VStack>

      {/* Reports Section */}
      <Box mb={6} flexDirection={"row"} gap={4} display={"flex"}>
        {" "}
        <InputGroup>
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputRightElement>
          <Input
            id="search"
            type="text"
            value={search}
            bg="white"
            onChange={handleSearch}
            placeholder="Pesquisar"
          />
        </InputGroup>
        <Button leftIcon={<EmailIcon />} variant={"button"} mt={"auto"}>
          Selecionar colunas
        </Button>
        <Button leftIcon={<EmailIcon />} variant={"button"} mt={"auto"}>
          Exportar log
        </Button>
      </Box>

      <Box
        bg={"white"}
        p={"24px"}
        borderRadius={"15"}
        border={"1px solid #d6d6d6"}
        shadow={"none"}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Heading size="md" mb={4}>
            Melhor desempenho
          </Heading>
          <Button
            rightIcon={<LuArrowUpRight size={22} />}
            variant={"text"}
            mt={"auto"}
            color={"primary"}
          >
            Ver todos
          </Button>
        </Box>

        <Box overflowX="auto" pt={4}>
          <TableReportActivities search={search} />
        </Box>
      </Box>
    </Box>
  );
}
