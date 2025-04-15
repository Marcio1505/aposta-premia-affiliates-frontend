import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  useToast,
  HStack,
  VStack,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { CopyIcon } from "@chakra-ui/icons";
import "chart.js/auto";
import { penSquare } from "../../assets";
import qrExample from "../../assets/qrExample.svg";
export default function Dashboard() {
  const toast = useToast();

  const chartData = {
    link: "https://example.com.br/123456789",
  };

  useEffect(() => {
    const updateChartWidth = () => {};

    updateChartWidth();
    window.addEventListener("resize", updateChartWidth);

    return () => {
      window.removeEventListener("resize", updateChartWidth);
    };
  }, []);

  return (
    <Box p={4} overflowY="auto" minH={"100vh"} w={"100%"}>
      <VStack w={"100%"} spacing={6} alignItems="strech">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading color={"primary"} textAlign="start" fontSize="xl">
            Links padrão
          </Heading>
        </HStack>
        <Flex
          gap={4}
          mb={6}
          flexWrap="wrap"
          justifyContent="start"
          alignItems="stretch"
        >
          <Text
            color={"primary"}
            display={"flex"}
            fontWeight={"bold"}
            fontSize="ll"
          >
            Parametros Dinâmicos
            <Image ml={1.5} w={5} src={penSquare} />
          </Text>
          <Divider />
          <HStack
            w={"100%"}
            spacing={10}
            alignItems="stretch"
            justifyContent={"space-between"}
            bg={"white"}
            p={4}
            border="1px solid #d6d6d6"
            borderRadius={12}
          >
            <VStack spacing={4} w={"full"} alignItems={"stretch"}>
              <Heading fontSize="xl" fontWeight={"bold"}>
                Link
              </Heading>
              <Text fontSize={"sm"} color={"black"}>
                Este é o seu link de afiliado, clique no ícone ao lado do texto
                para copiar.
              </Text>

              <HStack
                border={"2px dashed  #acacac"}
                borderRadius="xl"
                h={"full"}
                justifyContent={"space-between"}
                p={4}
              >
                <Box>
                  <Text fontSize={"md"} fontWeight={"bold"}>
                    Seu link de indicação
                  </Text>
                  <Text fontWeight={"medium"} fontSize={"sm"}>
                    {chartData.link}
                  </Text>
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
            </VStack>
            <Divider orientation="vertical" />
            <VStack>
              <Image src={qrExample} />
              <Button variant={"button"} mt={4}>
                Baixar seu QR Code
              </Button>
            </VStack>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
}
