import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  HStack,
  InputGroup,
  InputRightElement,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
  Image,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import googleICO from "../../assets/google.svg";
// import facebookICO from "../../assets/facebook.svg";
import { apfLogoWhite, logo } from "../../assets";
import { InputProps, ButtonProps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { loginUser } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { prohibitedMinorsPrimary } from "../../assets";

type CustomInputProps = InputProps & { variant?: "filled" };
export const CInput: React.FC<CustomInputProps> = (props) => (
  <Input {...props} />
);

type CustomButtonProps = ButtonProps & { variant?: "outline" | "link" };
export const CButton: React.FC<CustomButtonProps> = (props) => (
  <Button {...props} />
);

const schema = yup.object().shape({
  email: yup
    .string()
    .email("O email precisa ser valido.")
    .required("O email é obrigatório."),
  password: yup.string().required("A senha é obrigatória."),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const toast = useToast();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      login(data?.token);
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error.",
        description:
          "Nenhuma conta ativa encontrada para este e-mail. Verifique se você já realizou a ativação .",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error registering user:", error);
    },
  });

  const onSubmit = (data: Record<string, unknown>) => {
    mutate(data);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={"white"}
      w={"100%"}
      color={"#000"}
      borderRadius={{ base: "0", md1: "25px" }}
    >
      <Flex
        flexDir={{ base: "column", md1: "row" }}
        alignItems={{ base: "start", md1: "center" }}
        w={"100%"}
        bg={{ base: "white", md1: "primary" }}
      >
        <Box
          width={"100%"}
          display={{ base: "flex", md1: "none" }}
          bg={"brand.primary"}
          justifyContent="center"
          alignItems="center"
          p={4}
        >
          <Image src={apfLogoWhite} alt="Logo" w={90} />
        </Box>
        <VStack
          bg={"white"}
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
            <Image src={prohibitedMinorsPrimary} maxW={30} h="auto" />
            <Text
              lineHeight={"1em"}
              color={"primary"}
              textAlign={"start"}
              fontSize={12}
            >
              O uso dessa plataforma se destina a <br />
              <strong>maiores de idade</strong>. <br />
              Jogue com responsabilidade.
            </Text>
          </HStack>
        </VStack>
        <VStack
          align="stretch"
          p={6}
          maxW={"500px"}
          w={"full"}
          mx={"auto"}
          spacing={6}
          color={{ base: "primary", md1: "white" }}
        >
          <Heading
            as={"h1"}
            mx={"auto"}
            fontSize="2xl"
            mb={4}
            textAlign="start"
            color={{ base: "primary", md1: "white" }}
          >
            Fazer Login
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <FormControl isInvalid={!!errors?.email?.message} isRequired>
                <FormLabel
                  fontSize="xs"
                  color={{ base: "gray.700", md1: "gray.100" }}
                >
                  Seu endereço de e-mail
                </FormLabel>
                <Input
                  type="email"
                  placeholder="Insira seu e-mail"
                  bgColor="#EEEEEF"
                  borderRadius={"12px"}
                  py={6}
                  _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                  mb={3}
                  {...register("email")}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors?.password?.message}
                pb="4"
                isRequired
              >
                <FormLabel
                  fontSize="xs"
                  color={{ base: "gray.700", md1: "gray.100" }}
                >
                  Sua senha
                </FormLabel>

                <InputGroup>
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Insira sua senha"
                    bgColor="#EEEEEF"
                    variant="filled"
                    borderRadius={"12px"}
                    py={6}
                    mb={1}
                    _focus={{ border: "2px solid #ffffff", bgColor: "#ffffff" }}
                  />
                  <InputRightElement width="4.5rem" h={"3.1rem"}>
                    <Button size="sm" onClick={handleClick} variant="ghost">
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>

            <Button
              variant="link"
              fontSize="md"
              onClick={() => navigate("/request-password-reset")}
            >
              Esqueci minha senha
            </Button>

            <Button
              mt={4}
              w="full"
              variant={{ base: "button", md1: "login" }}
              borderColor={"white"}
              type="submit"
              h={12}
            >
              Continuar
            </Button>
          </form>

          <HStack my={4} width={"100%"}>
            <Divider />
            <Text color="gray.400"> ou </Text>
            <Divider />
          </HStack>

          {/* <VStack>
            <Button w="full" variant="providesButons" mb={3}>
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

          <Text my={4} textAlign="center" fontSize="sm">
            Não possui uma conta?{" "}
            <Button
              variant="link"
              color={{ base: "", md1: "white" }}
              _hover={{ color: { base: "", md1: "#d3d3d3" } }}
              fontSize="sm"
              onClick={() => navigate("/register")}
            >
              Cadastrar
            </Button>
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}
