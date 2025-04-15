import React, { useState } from "react";
import {
  Text,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Box,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { changePassword } from "../../../api";

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const toast = useToast();

  const handleChangePassword = async () => {
    if (newPassword !== repeatPassword) {
      toast({
        title: "Erro",
        description: "As novas senhas não coincidem.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await changePassword(token, { oldPassword, newPassword });
      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Limpar o formulário após salvar
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch {
      toast({
        title: "Erro",
        description: "Senha incorreta.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={{ base: 3, md1: 8 }} h={"78vh"}>
      <Text my={4} fontSize="2xl" fontWeight="bold">
        Segurança
      </Text>
      <Text fontSize="sm">Alterar a sua senha</Text>
      <VStack gap={4} mt={4} w={"full"}>
        <FormControl mt={2}>
          <FormLabel fontSize={"xs"}>Senha Atual</FormLabel>
          <InputGroup>
            <Input
              type={showOldPassword ? "text" : "password"}
              variant={"filled"}
              placeholder="Senha Atual"
              mt={1}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <IconButton
                variant={"ghost"}
                onClick={() => setShowOldPassword(!showOldPassword)}
                icon={showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={showOldPassword ? "Hide password" : "Show password"}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mt={2}>
          <FormLabel fontSize={"xs"}>Nova Senha</FormLabel>
          <InputGroup>
            <Input
              type={showNewPassword ? "text" : "password"}
              variant={"filled"}
              placeholder="Nova Senha"
              mt={1}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <IconButton
                variant={"ghost"}
                onClick={() => setShowNewPassword(!showNewPassword)}
                icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mt={2}>
          <FormLabel fontSize={"xs"}>Repita a Senha</FormLabel>
          <InputGroup>
            <Input
              type={showRepeatPassword ? "text" : "password"}
              variant={"filled"}
              placeholder="Repita a Senha"
              mt={1}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <IconButton
                variant={"ghost"}
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                icon={showRepeatPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={
                  showRepeatPassword ? "Hide password" : "Show password"
                }
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          variant={"button"}
          w={"full"}
          mt={8}
          onClick={handleChangePassword}
        >
          Salvar Alterações
        </Button>
      </VStack>
    </Box>
  );
};

export default ChangePassword;
