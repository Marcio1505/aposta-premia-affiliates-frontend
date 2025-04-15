import React from "react";
import {
  VStack,
  Box,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Heading,
} from "@chakra-ui/react";
import { rafiki } from "../../../assets";

const HelpAndFaq: React.FC = () => {
  const faqItems = [
    {
      id: 1,
      question: "Como funciona o ApostaPremia?",
      answer:
        "O ApostaPremia é um site de apostas esportivas que oferece cashback em todas as apostas realizadas. Para participar, basta se cadastrar no site, fazer suas apostas e aguardar a confirmação do cashback.",
    },
    {
      id: 2,
      question: "Como funciona o ApostaPremia?",
      answer:
        "O ApostaPremia é um site de apostas esportivas que oferece cashback em todas as apostas realizadas. Para participar, basta se cadastrar no site, fazer suas apostas e aguardar a confirmação do cashback.",
    },
    {
      id: 3,
      question: "Como funciona o ApostaPremia?",
      answer:
        "O ApostaPremia é um site de apostas esportivas que oferece cashback em todas as apostas realizadas. Para participar, basta se cadastrar no site, fazer suas apostas e aguardar a confirmação do cashback.",
    },
  ];

  return (
    <Box p={{ base: 3, md1: 8 }} minH={"78vh"}>
      <VStack
        mt={4}
        w="95%"
        maxW={1000}
        mx={"auto"}
        color={"primary"}
        spacing={6}
      >
        <Image src={rafiki} w={"80%"} maxW={300} />
        <Box w={"full"} color={"black"}>
          <Heading fontSize={"xl"}>Perguntas frequentes</Heading>
          <Text fontSize={"sm"}>
            Aqui você encontra as respostas para as perguntas mais comuns sobre
            o ApostaPremia.
          </Text>
        </Box>
        <Accordion w="full" allowToggle>
          {faqItems.map((item, index) => {
            let borderRadius = "0";
            if (index === 0) {
              borderRadius = "12px 12px 0 0";
            } else if (index === faqItems.length - 1) {
              borderRadius = "0 0 12px 12px";
            }

            return (
              <AccordionItem
                key={item.id}
                border={"1px solid #491474"}
                borderRadius={borderRadius}
                borderTop={index !== 0 ? "none" : "1px solid #491474"}
              >
                <AccordionButton>
                  <VStack w={"full"} align="start">
                    <Heading
                      fontSize={"lg"}
                      textAlign="left"
                      fontWeight={"bold"}
                    >
                      {item.question}
                    </Heading>
                    <Text fontSize={"sm"}>{item.question}</Text>
                  </VStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} fontSize={"sm"}>
                  {item.answer}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default HelpAndFaq;
