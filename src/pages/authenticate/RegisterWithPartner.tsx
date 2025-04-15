import { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  HStack,
  InputGroup,
  InputRightElement,
  Image,
  Divider,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import googleICO from "../../assets/google.svg";
// import facebookICO from "../../assets/facebook.svg";
import { logo } from "../../assets";

export default function RegisterWitchPartner() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box display="flex" justifyContent="center" color={"#000"}>
      <Box
        bg={{ base: "", md: "white" }}
        rounded={{ base: "", md: "lg" }}
        shadow={{ base: "", md: "md" }}
        maxWidth={{ base: "", md: "400px" }}
        h={{ base: "100vh", md: "" }}
        width="full"
      >
        <Box
          mb={6}
          width={"100%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={logo} alt="Logo" w={160} />
        </Box>

        <VStack align="stretch">
          <Text fontSize="xl" fontWeight="bold" textAlign="start">
            Vamos começar
          </Text>
          <Text fontSize="sm" color="gray.600" mb={4} textAlign="start">
            Crie uma senha para começar a usar o Aposta Premia
          </Text>

          <Box>
            <Text mb={1} fontSize="xs" color="gray.700">
              Crie uma senha
            </Text>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                bgColor="BGInput"
                placeholder="Insira sua senha"
                variant="filled"
              />
              <InputRightElement width="3rem">
                <Button
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                  p={0}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Button
            bgColor="#8E8E92"
            color="#CBCBCD"
            size="lg"
            mt={4}
            w="full"
            fontWeight="bold"
          >
            Continuar
          </Button>

          <HStack my={4} width={"100%"}>
            <Divider />
            <Text color="gray.400"> ou </Text>
            <Divider />
          </HStack>
          {/* 
          <VStack>
            <Button w="full" variant="providesButons">
              <img
                src={googleICO}
                width={23}
                alt="icon google"
                style={{
                  marginRight: "8px",
                }}
              />
              Entrar com Google
            </Button>
            <Button w="full" variant="providesButons">
              <img
                src={facebookICO}
                width={19}
                alt="icon facebook"
                style={{
                  marginRight: "8px",
                }}
              />
              Entrar com Facebook
            </Button>
          </VStack> */}

          <Text mt={10} textAlign="center" fontSize="sm">
            Não possui uma conta?{" "}
            <Button variant="link" colorScheme="blue" fontSize="sm">
              Cadastrar
            </Button>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
