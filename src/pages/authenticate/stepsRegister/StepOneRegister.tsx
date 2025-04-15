import { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  List,
  ListItem,
  Button,
  HStack,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
  FormControl,
  FormLabel,
  FormHelperText,
  ListIcon,
  Alert,
  AlertIcon,
  Divider,
  Image,
} from "@chakra-ui/react";
import { logo } from "../../../assets";
import { useFormContext } from "react-hook-form";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function StepOneRegister({
  onNext,
}: Readonly<{
  onNext: (data: Record<string, unknown>) => void;
}>) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const criteria = [
      { regex: /.{8,}/, mensagem: "A senha deve ter no mínimo 8 caracteres." },
      { regex: /[0-9]/, mensagem: "A senha precisa ter pelo menos um número." },
      {
        regex: /[a-z]/,
        mensagem: "A senha precisa ter pelo menos uma letra minúscula.",
      },
      {
        regex: /[A-Z]/,
        mensagem: "A senha precisa ter pelo menos uma letra maiúscula.",
      },
      {
        regex: /[^a-zA-Z0-9]/,
        mensagem: "A senha precisa ter pelo menos um caractere especial.",
      },
    ];

    return criteria.map(({ regex, mensagem }) => ({
      mensagem,
      error: !regex.test(password),
    }));
  };

  const passwordErrors = () => {
    const password = watch("password");
    const Validations = validatePassword(password);

    return (
      <Box p={4} borderWidth="1px" borderRadius="12px" overflow="hidden">
        <List spacing={2}>
          {Validations.map((validation) => (
            <ListItem key={validation.mensagem} display={"flex"}>
              {validation.error ? (
                <ListIcon
                  as={IoClose}
                  background={"red.500"}
                  color={"white"}
                  fontSize="24px"
                  borderRadius="50%"
                  p={"1"}
                />
              ) : (
                <ListIcon
                  as={FaCheck}
                  background={"green.500"}
                  color={"white"}
                  fontSize="24px"
                  borderRadius="50%"
                  p={"1"}
                />
              )}
              {validation.mensagem}
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const hideAlert = () => {
    setShowSuccessAlert(false);
  };

  const onSubmit = (data: Record<string, unknown>) => {
    setShowError(true);
    onNext(data);
  };

  return (
    <Box
      h={"100vh"}
      display="flex"
      justifyContent="center"
      alignItems={{ base: "start", md1: "center" }}
      color={"#000"}
    >
      {showSuccessAlert && (
        <Alert status="success" variant="subtle">
          <AlertIcon />
          Usuário registrado com sucesso!
          <Button onClick={hideAlert} ml={4}>
            Close
          </Button>
        </Alert>
      )}
      <Box w={"100%"}>
        <Box
          width={"100%"}
          display={{ base: "flex", md1: "none" }}
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
          bg={"brand.primary"}
          p={6}
        >
          <Image src={logo} alt="Logo" w={90} />
        </Box>

        <Box
          p={6}
          mx={"auto"}
          color={{ base: "primary", md1: "white" }}
          maxW={"500px"}
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="start">
            Vamos começar
          </Text>
          <Text
            fontSize="md"
            color={{ base: "gray.700", md1: "gray.100" }}
            mt={4}
            mb={4}
            textAlign="start"
          >
            Conecte uma das suas redes sociais ou insira o seu e-mail
          </Text>
          <VStack>
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
                variant="filled"
                borderRadius={"12px"}
                py={6}
                mb={3}
                _focus={{ border: "2px solid #491474" }}
                {...register("email")}
              />
              <FormErrorMessage>
                {String(errors?.email?.message)}
              </FormErrorMessage>
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
                Crie uma senha
              </FormLabel>

              <InputGroup>
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  variant="filled"
                  borderRadius={"12px"}
                  bg="rgb(232, 240, 254)"
                  py={6}
                  mb={1}
                  _focus={{
                    border: "2px solid #491474",
                    bgColor: "rgb(232, 240, 254)",
                  }}
                />
                <InputRightElement width="4.5rem" h={"3.1rem"}>
                  <Button size="sm" onClick={handleClick} variant="ghost">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormHelperText>{showError && passwordErrors()}</FormHelperText>
            </FormControl>
            <Button
              onClick={() => {
                setShowError(true);
                handleSubmit(onSubmit)();
              }}
              mb={2}
              w="full"
              mt={4}
              variant={{ base: "button", md1: "login" }}
              borderColor={"white"}
              h={12}
            >
              Continuar
            </Button>
          </VStack>

          <HStack my={8} width={"100%"}>
            <Divider />
            <Text color="gray.400"> ou </Text>
            <Divider />
          </HStack>

          {/* <VStack spacing={4}>
            <Button w="full" variant="providesButons">
              <img
                src={google}
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
                src={facebook}
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
            Ja possui uma conta?{" "}
            <Button
              variant="link"
              color={{ base: "", md1: "white" }}
              _hover={{ color: { base: "", md1: "#d3d3d3" } }}
              fontSize="sm"
              onClick={() => navigate("/login")}
            >
              Fazer login
            </Button>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
