import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  HStack,
  Icon,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useRef, useState } from "react";
import { logo } from "../../../assets";
import { useMutation } from "react-query";
import { resendVerificationUser, verificationUser } from "../../../api";

type EmailVerificationProps = {
  email: string;
};
export default function EmailVerification({ email }: EmailVerificationProps) {
  const toast = useToast();
  const navigate = useNavigate();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text");
    if (paste.length === 6) {
      const newCode = paste.split("").slice(0, 6);
      setCode(newCode);
      newCode.forEach((char, index) => {
        if (inputsRef.current[index]) {
          inputsRef.current[index]!.value = char;
        }
      });
      inputsRef.current[5]?.focus();
    }
  };

  const { mutate: mutateResendCode } = useMutation(resendVerificationUser, {
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Codigo enviado com sucesso.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Erro.",
        description: "Erro ao renviar o codigo, tente novamente mais tarde.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error sending code:", error);
    },
  });

  const handleResendCode = () => {
    mutateResendCode({ email });
  };

  const { mutate } = useMutation(verificationUser, {
    onSuccess: () => {
      setIsVerified(true);
    },
    onError: (error) => {
      toast({
        title: "Erro.",
        description: "Codigo inválido, por favor verifique seu email.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error registering user:", error);
    },
  });

  const handleSubmit = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      const body = {
        email: email,
        verificationCode: fullCode,
      };
      mutate(body);
    } else {
      console.error("Insira um código válido!");
    }
  };

  return (
    <VStack
      width="full"
      h={"100vh"}
      justifyContent={{ base: "space-between", md1: "center" }}
      alignItems="center"
    >
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
      {!isVerified ? (
        <VStack align="center" color={{ base: "primary", md1: "white" }}>
          <VStack justifyContent={"space-between"} p={6}>
            <Box>
              <Text
                fontSize="xl"
                w={"full"}
                fontWeight="bold"
                textAlign="start"
              >
                Verifique a sua caixa de e-mail
              </Text>
              <Text fontSize="sm" mb={6}>
                Insira o código de 6 dígitos que foi enviado para o seu e-mail.
              </Text>
            </Box>
            <VStack spacing={4}>
              <Box>
                <HStack justifyContent="center" spacing={2}>
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <Input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        type="text"
                        maxLength={1}
                        textAlign="center"
                        fontSize="xl"
                        maxW="3rem"
                        minW={"0.5rem"}
                        height="3rem"
                        variant="filled"
                        value={code[index]}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={index === 0 ? handlePaste : undefined}
                      />
                    ))}
                </HStack>
                <Text mt={2} fontSize="xs" textAlign="center">
                  Código enviado, verifique o seu dispositivo.
                </Text>
              </Box>
            </VStack>
            <HStack justifyContent="center" mt={6} mb={12}>
              <Text fontSize="sm">Não recebeu?</Text>
              <Button
                variant="link"
                color={{ base: "primary", md1: "white" }}
                _hover={{ color: { base: "", md1: "#d3d3d3" } }}
                fontSize="sm"
                onClick={handleResendCode}
              >
                Enviar novamente
              </Button>
            </HStack>
            <Button
              onClick={handleSubmit}
              variant={{ base: "button", md1: "login" }}
              w={"full"}
              _hover={{ color: { base: "", md1: "#ffffff" } }}
              isDisabled={code.some((digit) => digit === "")}
            >
              Continuar
            </Button>
          </VStack>
        </VStack>
      ) : (
        <VStack h={"full"} align="center">
          <VStack h={"full"} justifyContent={"space-between"} p={6}>
            <Box h={4} />

            <VStack>
              <Icon as={FaCheckCircle} mb={4} color="#2DDB89" boxSize="6rem" />
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                Conta validada!
              </Text>
              <Text fontSize="md" color="gray.600" textAlign="center">
                Clique no botão abaixo para começar a sua jornada com o Aposta
                Premia.
              </Text>
            </VStack>

            <Button
              onClick={() => navigate("/login")}
              size="lg"
              w="full"
              fontWeight="bold"
              variant="button"
              _hover={{ color: { base: "", md1: "#d3d3d3" } }}
            >
              Continuar
            </Button>
          </VStack>
        </VStack>
      )}
      <Box h={20} display={{ base: "flex", md1: "none" }} />
    </VStack>
  );
}
