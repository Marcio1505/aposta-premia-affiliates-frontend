import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  IconButton,
  useToast,
  HStack,
  Button,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { CopyIcon } from "@chakra-ui/icons";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { cardUser, flag, graphUp, restart } from "../../assets";

const mockData = [
  {
    posicao: 1,
    marca: "A",
    nome: "Exemplo 1",
    cadastros: 10,
    comissao: "R$ 100,00",
  },
  {
    posicao: 2,
    marca: "B",
    nome: "Exemplo 2",
    cadastros: 8,
    comissao: "R$ 80,00",
  },
  {
    posicao: 3,
    marca: "C",
    nome: "Exemplo 3",
    cadastros: 5,
    comissao: "R$ 50,00",
  },
];

export default function Dashboard() {
  const toast = useToast();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Data",
        data: [12, 19, 3, 5, 2],
        borderColor: "#250061",
        backgroundColor: "rgba(33, 0, 201, 0.2)",
      },
    ],
    link: "https://example.com",
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    const updateChartWidth = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.offsetWidth);
      }
    };

    updateChartWidth();
    window.addEventListener("resize", updateChartWidth);

    return () => {
      window.removeEventListener("resize", updateChartWidth);
    };
  }, []);

  return (
    <Box p={4} overflowY="auto" w={"100%"}>
      <VStack w={"100%"} spacing={6} alignItems="strech">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading color={"primary"} textAlign="start" fontSize="xl">
            Visão Geral
          </Heading>
          <HStack>
            <Button variant={"outline"}>
              <Image src={flag} mr={1.5} /> Seus objetivos
            </Button>
            <Button variant={"outline"}>
              <Image src={cardUser} mr={1.5} /> Fale com seu gerente
            </Button>
          </HStack>
        </HStack>
        <Flex
          gap={4}
          mb={6}
          flexWrap="wrap"
          justifyContent="start"
          alignItems="stretch"
        >
          <Card
            flex="1"
            bg={"white"}
            p={3}
            borderRadius={"15"}
            border={"1px solid #d6d6d6"}
            shadow={"none"}
          >
            <CardBody
              display={"flex"}
              flexDir={"column"}
              justifyContent="space-evenly"
              h={"100%"}
            >
              <HStack>
                <Box>
                  <Heading fontSize="xl" fontWeight={"bold"} mb={2}>
                    Link
                  </Heading>
                  <Text fontSize={"sm"} color={"black"}>
                    Este é o seu link de afiliado, clique no ícone ao lado do
                    texto para copiar.
                  </Text>
                </Box>
                <HStack border={"2px dashed  #acacac"} borderRadius="xl" p={4}>
                  <Box>
                    <Text fontSize={"sm"}>Seu link de indicação</Text>
                    <Text>{chartData.link}</Text>
                  </Box>

                  <IconButton
                    size="sm"
                    icon={
                      <CopyIcon color={"primary"} _hover={{ color: "white" }} />
                    }
                    aria-label="Copiar Link"
                    borderRadius={"50px"}
                    bg={"purple.100"}
                    _hover={{ bg: "primary", color: "white" }}
                    onClick={() => {
                      navigator.clipboard.writeText(chartData.link);
                      toast({
                        title: "Link copiado!",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  />
                </HStack>
              </HStack>
            </CardBody>
          </Card>

          <Card
            flex="1"
            bg={"white"}
            p={3}
            borderRadius={"15"}
            border={"1px solid #d6d6d6"}
            shadow={"none"}
          >
            <CardBody
              justifyContent={"center"}
              display={"flex"}
              flexDir={"column"}
            >
              <HStack
                borderRadius="xl"
                w={"full"}
                justifyContent={"space-between"}
              >
                <Box>
                  <Heading size="md" fontWeight={"bold"} mb={2}>
                    Saldo atual
                  </Heading>
                  <Text fontSize="2xl" color={"primary"} fontWeight="light">
                    R${" "}
                    <Text display={"inline"} fontWeight={"black"}>
                      1.234,56
                    </Text>
                  </Text>
                </Box>

                <HStack>
                  <Text fontSize="sm" fontWeight={"bold"} color={"primary"}>
                    ver valores totais
                  </Text>
                  <Image src={graphUp} />
                </HStack>
              </HStack>
            </CardBody>
          </Card>
        </Flex>
        <Box mb={6}>
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

            <Button variant={"button"} mt={"auto"}>
              <Image src={restart} mr={1.5} /> Atualizar
            </Button>
          </Flex>
        </Box>
        <Tabs
          bg={"white"}
          p={4}
          borderRadius={"15"}
          border={"1px solid #d6d6d6"}
          variant="enclosed"
        >
          <TabList flexWrap="wrap" justifyContent={"space-between"}>
            <Tab
              w={"25%"}
              border={"none"}
              borderRadius={0}
              mb={2}
              color={"primary"}
              _selected={{ color: "brand.secondary" }}
            >
              <Box textAlign={"start"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Comissões
                </Text>
                <Text color={"black"} fontWeight={"bold"}>
                  R$ XX,XX
                </Text>
                <Text color={"brand.quaternary"} fontSize={"xs"}>
                  +0.0%
                </Text>
              </Box>
            </Tab>
            <Tab
              w={"25%"}
              border={"none"}
              borderRadius={0}
              mb={2}
              color={"primary"}
              borderLeft={"1px solid  #d6d6d6"}
              _selected={{ color: "brand.secondary" }}
            >
              <Box textAlign={"start"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  {" "}
                  Clicks
                </Text>
                <Text color={"black"} fontWeight={"bold"}>
                  28.2K
                </Text>
                <Text color={"brand.quaternary"} fontSize={"xs"}>
                  +0.0%
                </Text>
              </Box>
            </Tab>
            <Tab
              w={"25%"}
              border={"none"}
              borderRadius={0}
              mb={2}
              color={"primary"}
              borderLeft={"1px solid  #d6d6d6"}
              _selected={{ color: "brand.secondary" }}
            >
              <Box textAlign={"start"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Registros
                </Text>
                <Text color={"black"} fontWeight={"bold"}>
                  5.6K
                </Text>
                <Text color={"brand.quaternary"} fontSize={"xs"}>
                  +0.0%
                </Text>
              </Box>
            </Tab>
            <Tab
              w={"25%"}
              border={"none"}
              borderRadius={0}
              mb={2}
              color={"primary"}
              borderLeft={"1px solid  #d6d6d6"}
              _selected={{ color: "brand.secondary" }}
            >
              <Box textAlign={"start"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  FTD
                </Text>
                <Text color={"black"} fontWeight={"bold"}>
                  876
                </Text>
                <Text color={"brand.quaternary"} fontSize={"xs"}>
                  +0.0%
                </Text>
              </Box>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box ref={chartContainerRef} height="400px">
                <Line
                  data={chartData}
                  options={chartOptions}
                  width={chartWidth}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box ref={chartContainerRef} height="400px">
                <Line
                  data={chartData}
                  options={chartOptions}
                  width={chartWidth}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box ref={chartContainerRef} height="400px">
                <Line
                  data={chartData}
                  options={chartOptions}
                  width={chartWidth}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box ref={chartContainerRef} height="400px">
                <Line
                  data={chartData}
                  options={chartOptions}
                  width={chartWidth}
                />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <VStack
          spacing={4}
          bg={"white"}
          p={4}
          py={8}
          borderRadius={"15"}
          border={"1px solid #d6d6d6"}
          shadow={"none"}
          alignItems={"stretch"}
        >
          <Heading fontSize={"xl"} ml={2} fontWeight={"bold"}>
            Melhor desempenho
          </Heading>
          <Box>
            <Box
              as="table"
              w="100%"
              mt={4}
              borderBottom="1px solid #d6d6d6"
              borderRadius="8px"
            >
              <Box as="thead" borderBottom={"1px solid #d6d6d6"}>
                <Box as="tr">
                  <Box as="th" p={2} textAlign="left">
                    Posição
                  </Box>
                  <Box as="th" p={2} textAlign="left">
                    Marca
                  </Box>
                  <Box as="th" p={2} textAlign="left">
                    Nome
                  </Box>
                  <Box as="th" p={2} textAlign="left">
                    Cadastros
                  </Box>
                  <Box as="th" p={2} textAlign="left">
                    Comissão
                  </Box>
                </Box>
              </Box>
              <Box as="tbody">
                {mockData.map((item, index) => (
                  <Box as="tr" key={index} borderBottom="1px solid #d6d6d6">
                    <Box as="td" p={2}>
                      {item.posicao}
                    </Box>
                    <Box as="td" p={2}>
                      {item.marca}
                    </Box>
                    <Box as="td" p={2}>
                      {item.nome}
                    </Box>
                    <Box as="td" p={2}>
                      {item.cadastros}
                    </Box>
                    <Box as="td" p={2}>
                      {item.comissao}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
}
