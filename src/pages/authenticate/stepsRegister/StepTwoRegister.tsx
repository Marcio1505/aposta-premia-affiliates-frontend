import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { logo } from "../../../assets";
import { SelectField, TextField } from "../../../components/ui/form";

type StepTwoProps = {
  prevStep: () => void;
  onNext: (data: Record<string, unknown>) => void;
};

export default function StepTwo({ prevStep, onNext }: StepTwoProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems={{ base: "start", md1: "center" }}
      color={{ base: "primary", md1: "white" }}
    >
      <Box w={"100%"}>
        <HStack
          width={"100%"}
          display={{ base: "flex", md1: "none" }}
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
          bg={"brand.primary"}
          p={6}
        >
          <Button variant="link" onClick={prevStep}>
            <HiOutlineArrowLeftCircle color="white" size={30} />
          </Button>
          <Image src={logo} alt="Logo" w={90} />
          <Box w="30px" />
        </HStack>

        <VStack alignItems="stretch" p={6} mx={"auto"} maxW={"500px"}>
          <Text fontSize="xl" fontWeight="bold">
            Continue seu cadastro
          </Text>
          <VStack
            as="form"
            onSubmit={handleSubmit(onNext)}
            align="stretch"
            spacing={4}
          >
            <HStack>
              <TextField
                _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                label="Nome"
                placeholder="Nome"
                name="firstName"
              />
              <TextField
                _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                label="Sobrenome"
                placeholder="Sobrenome"
                name="lastName"
              />
            </HStack>
            <Box borderRadius={12}>
              <TextField
                bg={"#EEEEEF"}
                label="CPF"
                placeholder="Insira seu CPF"
                name="cpf"
                mask="999.999.999-99"
                variant={"filled"}
              />
            </Box>

            <SelectField
              _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
              name="gender"
              label="Gênero"
              placeholder="Escolha seu gênero"
              color={"black"}
              options={[
                { value: "Male", label: "Masculino" },
                { value: "Female", label: "Feminino" },
                { value: "Other", label: "Outro" },
              ]}
            />
            <FormControl isInvalid={!!errors.birthDate}>
              <FormLabel fontSize="xs">Data de Nascimento</FormLabel>
              <Input
                _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                variant="filled"
                h={12}
                borderRadius={12}
                type="date"
                {...register("birthDate")}
              />
              <FormErrorMessage>
                A data de nascimento é obrigatória.
              </FormErrorMessage>
            </FormControl>
            <TextField
              _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
              label="Telefone"
              placeholder="Seu telefone com DDD"
              name="phone"
              mask="(99) 99999-9999"
            />
            <Button
              type="submit"
              variant={{ base: "button", md1: "login" }}
              borderColor={"white"}
              h={12}
              w="full"
              mt={4}
            >
              Continuar
            </Button>
          </VStack>
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
        </VStack>
      </Box>
    </Box>
  );
}
