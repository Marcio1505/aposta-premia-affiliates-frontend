import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import {
  Slide,
  Box,
  Image,
  Text,
  useToast,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import { StepTreeAddress } from "./StepTreeAddress";
import StepTwo from "./StepTwoRegister";
import { registerUser } from "../../../api";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailVerification from "./EmailVerification";
import { apfLogoWhite, logo, prohibitedMinorsPrimary } from "../../../assets";
import {
  schemaStepRegister,
  schemaStepFinal,
  schemaStepAddress,
} from "./schemas";
import StepOneRegister from "./StepOneRegister";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stepSchemas: any[] = [
  schemaStepRegister,
  schemaStepFinal,
  schemaStepAddress,
  undefined,
];

export interface IRegister {
  email?: string;
  password?: string;
  cep?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  firstName?: string;
  lastName?: string;
  cpf?: string;
  gender?: string;
  birthDate?: Date;
  phone?: string;
  referralCode?: string;
}

export const MultiStepForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(4);
  const [formData, setFormData] = useState<IRegister>({
    referralCode: searchParams.get("ref") ?? undefined,
  } as IRegister);

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(stepSchemas[step - 1]),
  });
  const toast = useToast();

  const nextStep = (data: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleFinalSubmit = (data: IRegister) => {
    const sanitizedCep = data?.cep?.replace(/\D/g, "");
    const body = {
      ...formData,
      address: { ...data, cep: sanitizedCep },
      referralCode: formData?.referralCode,
    };
    mutate(body);
  };

  const { mutate } = useMutation(registerUser, {
    onSuccess: () => {
      toast({
        title: "Conta Criada.",
        description: "Criamos sua conta para você.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setStep((prev) => prev + 1);
    },
    onError: (error: unknown) => {
      toast({
        title: "Erro.",
        description: "Houve um erro ao criar sua conta.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error registering user:", error);
    },
  });

  return (
    <Box>
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
      <Box>
        <FormProvider {...methods}>
          <Slide direction="left" in={step === 1}>
            <Box
              bg={{ base: "white", md1: "primary" }}
              color={{ base: "primary", md1: "white" }}
              overflowY="auto"
              ml={{ base: 0, md1: "50%" }}
              maxW={{ base: "100%", md1: "50%" }}
              maxHeight="100vh"
            >
              {step === 1 && <StepOneRegister onNext={nextStep} />}
            </Box>
          </Slide>
          <Slide direction="left" in={step === 2}>
            <Box
              bg={{ base: "white", md1: "primary" }}
              color={{ base: "primary", md1: "white" }}
              overflowY="auto"
              ml={{ base: 0, md1: "50%" }}
              maxW={{ base: "100%", md1: "50%" }}
              maxHeight="100vh"
            >
              {step === 2 && <StepTwo prevStep={prevStep} onNext={nextStep} />}
            </Box>
          </Slide>
          <Slide direction="left" in={step === 3}>
            <Box
              bg={{ base: "white", md1: "primary" }}
              color={{ base: "primary", md1: "white" }}
              overflowY="auto"
              ml={{ base: 0, md1: "50%" }}
              maxW={{ base: "100%", md1: "50%" }}
              maxHeight="100vh"
            >
              {step === 3 && (
                <StepTreeAddress
                  prevStep={prevStep}
                  handleFinalSubmit={handleFinalSubmit}
                />
              )}
            </Box>
          </Slide>
          <Slide direction="left" in={step === 4}>
            <Box
              bg={{ base: "white", md1: "primary" }}
              color={{ base: "primary", md1: "white" }}
              overflowY="auto"
              ml={{ base: 0, md1: "50%" }}
              maxW={{ base: "100%", md1: "50%" }}
              maxHeight="100vh"
            >
              {step === 4 && (
                <EmailVerification email={formData?.email as string} />
              )}
            </Box>
          </Slide>
        </FormProvider>
      </Box>
    </Box>
  );
};
