import {
  Box,
  VStack,
  Text,
  Button,
  InputGroup,
  Input,
  Image,
  useToast,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { logo } from "../../assets";
import { CheckCircleIcon } from "@chakra-ui/icons"; // Ícone de check
import { passwordResetUser } from "../../api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { bgDesktop, prohibitedMinors } from "../../assets";

export default function ResetPassword() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false); // Novo estado
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const { mutate } = useMutation(passwordResetUser, {
    onSuccess: () => {
      setIsEmailSent(true);
    },
    onError: (error) => {
      toast({
        title: "Error.",
        description: "There was an error creating your account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error registering user:", error);
    },
  });

  const handleSendEmail = () => {
    if (isEmailValid) {
      mutate({ email });
    }
  };

  if (isEmailSent) {
    return (
      <Box
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={{ base: "white", md: "gray.50" }}
        color={"#000"}
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          alignItems={{ base: "start", md: "center" }}
          w={"100%"}
        >
          <Box
            width={"100%"}
            display={{ base: "flex", md1: "none" }}
            bg={"brand.primary"}
            justifyContent="center"
            alignItems="center"
            p={6}
          >
            <Image src={logo} alt="Logo" w={90} />
          </Box>
          <VStack
            bgImage={bgDesktop}
            bgPosition="center"
            bgRepeat="no-repeat"
            position={{ md: "relative" }}
            zIndex={1}
            bgSize="cover"
            width={{ base: "0%", md1: "50%" }}
            height="100vh"
            justifyContent={"space-between"}
            display={{ base: "none", md1: "flex" }}
          >
            <Box h={40} />
            <Button variant={"unstiled"} onClick={() => navigate("/")}>
              <Image src={logo} width={"13rem"} mx={"auto"} />
            </Button>
            <HStack color={"white"} mb={10}>
              <Image src={prohibitedMinors} maxW={30} h="auto" />
              <Text lineHeight={"1em"} textAlign={"start"} fontSize={12}>
                O uso dessa plataforma se destina a <br />
                <strong>maiores de idade</strong>. <br />
                Jogue com responsabilidade.
              </Text>
            </HStack>
          </VStack>
          <VStack p={6} h={"full"} justifyContent={"space-between"}>
            <Box h={20} />
            <Box textAlign={"center"}>
              <CheckCircleIcon
                boxSize={24}
                color="#2DDB89"
                width="full"
                mb={4}
              />
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                E-mail de verificação enviado com sucesso
              </Text>
              <Text fontSize="sm" color="gray.600" mb={6}>
                Cheque seu e-mail e clique no link que foi enviado para
                redefinir a sua senha.
              </Text>
            </Box>

            <Button
              size="lg"
              variant={"button"}
              onClick={() => navigate("/login")}
              width="full"
            >
              Continuar
            </Button>
          </VStack>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems={{ base: "start", md1: "center" }}
      bg="gray.50"
      color={"#000"}
    >
      <Flex
        flexDir={{ base: "column", md1: "row" }}
        w={"100%"}
        h={"100vh"}
        justifyContent={"space-between"}
      >
        <Box
          width={"100%"}
          display={{ base: "flex", md1: "none" }}
          bg={"brand.primary"}
          justifyContent="center"
          alignItems="center"
          p={6}
        >
          <Image src={logo} alt="Logo" w={90} />
        </Box>
        <VStack
          bgImage={bgDesktop}
          bgPosition="center"
          bgRepeat="no-repeat"
          position={{ md: "relative" }}
          zIndex={1}
          bgSize="cover"
          width={{ base: "0%", md1: "50%" }}
          height="100vh"
          justifyContent={"space-between"}
          display={{ base: "none", md1: "flex" }}
        >
          <Box h={40} />
          <Button variant={"unstiled"} onClick={() => navigate("/")}>
            <Image src={logo} width={"13rem"} mx={"auto"} />
          </Button>
          <HStack color={"white"} mb={10}>
            <Image src={prohibitedMinors} maxW={30} h="auto" />
            <Text lineHeight={"1em"} textAlign={"start"} fontSize={12}>
              O uso dessa plataforma se destina a <br />
              <strong>maiores de idade</strong>. <br />
              Jogue com responsabilidade.
            </Text>
          </HStack>
        </VStack>
        <VStack
          align="stretch"
          maxW={"500px"}
          mx={"auto"}
          justifyContent={"center"}
          p={6}
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="start">
            Redefinir senha
          </Text>
          <Text fontSize="md" color="gray.600" mb={6} textAlign="start">
            Insira o e-mail da conta que você quer recuperar a senha
          </Text>

          <Box>
            <Text
              mt={4}
              fontSize="0.7em"
              fontWeight={"medium"}
              color="gray.700"
            >
              Seu endereço de e-mail
            </Text>
            <InputGroup>
              <Input
                type={"email"}
                placeholder="Insira seu e-mail"
                borderRadius={"12px"}
                py={6}
                mb={3}
                mt={2}
                _focus={{ border: "2px solid #491474" }}
                value={email}
                onChange={handleEmailChange}
              />
            </InputGroup>
            {!isEmailValid && email && (
              <Text fontSize="xs" color="red.500" mt={1}>
                Por favor, insira um e-mail válido.
              </Text>
            )}
          </Box>

          <Button
            size="lg"
            mt={4}
            w="full"
            isDisabled={!isEmailValid}
            variant={"button"}
            onClick={handleSendEmail}
          >
            Enviar e-mail de recuperação
          </Button>
        </VStack>
        <Box h={20} />
      </Flex>
    </Box>
  );
}
