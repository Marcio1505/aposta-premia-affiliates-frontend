import { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  ListIcon,
  FormControl,
  Image,
  FormLabel,
  FormHelperText,
  useToast,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa6";
import { logo } from "../../assets";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoClose } from "react-icons/io5";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { newPasswordUser } from "../../api/user";
import { useParams } from "react-router-dom";
import { bgDesktop, prohibitedMinors } from "../../assets";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .matches(/[0-9]/, "A senha precisa ter pelo menos um número.")
    .matches(/[a-z]/, "A senha precisa ter pelo menos uma letra minúscula.")
    .matches(/[A-Z]/, "A senha precisa ter pelo menos uma letra maiúscula.")
    .matches(
      /[^a-zA-Z0-9]/,
      "A senha precisa ter pelo menos um caractere especial."
    )
    .required("A senha é obrigatória."),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .matches(/[0-9]/, "A senha precisa ter pelo menos um número.")
    .matches(/[a-z]/, "A senha precisa ter pelo menos uma letra minúscula.")
    .matches(/[A-Z]/, "A senha precisa ter pelo menos uma letra maiúscula.")
    .matches(
      /[^a-zA-Z0-9]/,
      "A senha precisa ter pelo menos um caractere especial."
    )
    .required("A senha é obrigatória.")
    .oneOf([yup.ref("newPassword"), ""], "As senhas não coincidem."),
});

type LoginFormInputs = {
  password: string;
  newPassword: string;
};
export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleClick = () => setShowPassword(!showPassword);

  const validatePassword = (password: string, newPassword: string) => {
    const criteria = [
      {
        regex: /.{8,}/,
        mensagem: "Password must be at least 8 characters long.",
      },
      {
        regex: /[0-9]/,
        mensagem: "Password must contain at least one number.",
      },
      {
        regex: /[a-z]/,
        mensagem: "Password must contain at least one lowercase letter.",
      },
      {
        regex: /[A-Z]/,
        mensagem: "Password must contain at least one uppercase letter.",
      },
      {
        regex: /[^a-zA-Z0-9]/,
        mensagem: "Password must contain at least one special character.",
      },
      {
        regex: new RegExp(`^${password}$`),
        mensagem: "Passwords do not match.",
      },
    ];

    return criteria.map(({ regex, mensagem }) => ({
      mensagem,
      error: !(regex.test(newPassword) && regex.test(password)),
    }));
  };

  const { mutate } = useMutation(newPasswordUser, {
    onSuccess: () => {
      toast({
        title: "Password reset.",
        description: "Your password has been reset.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: "Error.",
        description: "There was an error resetting your password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error registering user:", error);
    },
  });

  const { token } = useParams<{ token: string }>();

  const onSubmit = (data: LoginFormInputs) => {
    mutate({ ...data, token });
  };

  const passwordErrors = () => {
    const password = watch("password");
    const newPassword = watch("newPassword");
    const Validations = validatePassword(password, newPassword);

    return (
      <Box p={4} borderWidth="1px" borderRadius="12px" overflow="hidden">
        <List spacing={2}>
          {Validations.map((validation, index) => (
            <ListItem key={index} display={"flex"}>
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

  return (
    <Box h={"100vh"} w={"100vw"} display="flex" color={"#000"}>
      <Flex
        flexDir={{ base: "column", md1: "row" }}
        alignItems="center"
        justifyContent={"space-between"}
        w={"100vw"}
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
        <FormLabel p={6}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="start">
            Redefinir senha
          </Text>
          <Text fontSize="md" color="gray.600" mb={6} mt={2} textAlign="start">
            Certifique-se de guardar a nova senha em um local seguro
          </Text>

          <Box>
            <FormControl
              isInvalid={!!errors?.password?.message}
              pb="4"
              isRequired
            >
              <FormLabel fontSize="xs" color="gray.700">
                Crie uma senha
              </FormLabel>

              <InputGroup>
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  bgColor="#EEEEEF"
                  borderRadius={"12px"}
                  py={6}
                  _focus={{ border: "2px solid #491474" }}
                  mb={1}
                />
                <InputRightElement width="4.5rem" h="3.1rem">
                  <Button size="sm" onClick={handleClick} variant="ghost">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.newPassword?.message}
              pb="4"
              isRequired
            >
              <FormLabel fontSize="xs" color="gray.700">
                Confirme sua senha
              </FormLabel>

              <InputGroup>
                <Input
                  {...register("newPassword")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  borderRadius={"12px"}
                  py={6}
                  bgColor="#EEEEEF"
                  _focus={{ border: "2px solid #491474" }}
                  variant="filled"
                  mb={1}
                />
                <InputRightElement width="4.5rem" h="3.1rem">
                  <Button size="sm" onClick={handleClick} variant="ghost">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>{showError && passwordErrors()}</FormHelperText>
            </FormControl>
          </Box>

          <Button
            onClick={() => {
              setShowError(true);
              handleSubmit(onSubmit)();
            }}
            size="lg"
            mt={4}
            w="full"
            variant="button"
          >
            Continuar
          </Button>
        </FormLabel>
        <Box w={5} />
      </Flex>
    </Box>
  );
}
