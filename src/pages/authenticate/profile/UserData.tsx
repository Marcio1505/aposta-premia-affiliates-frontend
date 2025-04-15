import React, { useEffect, useState } from "react";
import {
  Text,
  Spinner,
  Input,
  VStack,
  Button,
  Select,
  HStack,
  FormLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { userProfile, userProfileUpdate } from "../../../api";
import InputMask from "react-input-mask";

interface Address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  email: string;
  birthDate: string; // Adicionado campo birthDate
  address: Address;
}

const UserData: React.FC = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await userProfile(token);
        setData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) =>
      prevData
        ? { ...prevData, address: { ...prevData.address, [name]: value } }
        : null
    );
  };

  const handleSave = async () => {
    try {
      await userProfileUpdate(token, data);
      setIsEditing(false);
      toast({
        title: "Dados atualizados.",
        description: "Seus dados foram atualizados com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      onClose();
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return <Text>No user data available</Text>;
  }

  return (
    <VStack
      spacing={4}
      align="start"
      bg={"white"}
      w={{ base: "100vw", md1: "100%" }}
      mx="auto"
      p={{ base: 3, md1: 8 }}
      borderRadius="md"
    >
      <Flex alignItems={"strech"} flexDir={{ base: "column", md1: "row" }}>
        <VStack alignItems={"strech"} w={{ base: "100%", md1: "55%" }}>
          <Text fontSize="xl" fontWeight="bold">
            Seus dados cadastrais
          </Text>
          <FormLabel fontSize="xs" fontWeight="light">
            Primeiro Nome
            <Input
              name="firstName"
              value={data.firstName}
              isDisabled={!isEditing}
              onChange={handleInputChange}
              placeholder="Primeiro Nome"
              variant="filled"
            />
          </FormLabel>
          <FormLabel fontSize="xs" fontWeight="light">
            Sobrenome
            <Input
              name="lastName"
              value={data.lastName}
              isDisabled={!isEditing}
              onChange={handleInputChange}
              placeholder="Sobrenome"
              variant="filled"
            />
          </FormLabel>
          <FormLabel fontSize="xs" fontWeight="light">
            E-mail
            <Input
              name="email"
              value={data.email}
              isDisabled={true}
              placeholder="E-mail"
              variant="filled"
            />
          </FormLabel>
          <FormLabel fontSize="xs" fontWeight="light">
            Telefone
            <Input
              as={InputMask}
              mask="(99) 99999-9999"
              name="phone"
              value={data.phone}
              isDisabled={!isEditing}
              onChange={handleInputChange}
              placeholder="Telefone"
              variant="filled"
            />
          </FormLabel>

          <FormLabel fontSize="xs" fontWeight="light">
            Gênero
            <Select
              name="gender"
              h={"60px"}
              borderRadius={12}
              value={data.gender}
              isDisabled={!isEditing}
              onChange={handleInputChange}
              variant="filled"
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </Select>
          </FormLabel>
          <FormLabel fontSize="xs" fontWeight="light">
            Data de Nascimento
            <Input
              name="birthDate"
              type="date"
              value={data.birthDate.split("T")[0]} // Formatar para yyyy-MM-dd
              isDisabled={!isEditing}
              onChange={handleInputChange}
              placeholder="Data de Nascimento"
              variant="filled"
            />
          </FormLabel>
          <Button
            display={{ base: "none", md1: "flex" }}
            variant={"button"}
            mt={4}
            onClick={() => {
              if (isEditing) {
                onOpen();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Salvar alterações" : "Editar"}
          </Button>
        </VStack>
        <VStack
          marginTop={{ base: 8, md1: "0" }}
          alignItems={"strech"}
          w={{ base: "100%", md1: "45%" }}
        >
          <Text fontSize="xl" fontWeight="bold">
            Endereço
          </Text>
          <FormLabel fontSize="xs" fontWeight="light">
            CEP
            <Input
              name="cep"
              value={data.address.cep}
              isDisabled={!isEditing}
              onChange={handleAddressChange}
              placeholder="CEP"
              variant="filled"
            />
          </FormLabel>
          <FormLabel fontSize="xs" fontWeight="light">
            Rua
            <Input
              name="street"
              value={data.address.street}
              isDisabled={!isEditing}
              onChange={handleAddressChange}
              placeholder="Rua"
              variant="filled"
            />
          </FormLabel>
          <HStack>
            <FormLabel fontSize="xs" w={"25%"} fontWeight="light">
              Número
              <Input
                name="number"
                textAlign={"center"}
                value={data.address.number}
                isDisabled={!isEditing}
                onChange={handleAddressChange}
                placeholder="Número"
                variant="filled"
              />
            </FormLabel>
            <FormLabel w={"75%"} fontSize="xs" fontWeight="light">
              Complemento
              <Input
                name="complement"
                value={data.address.complement}
                isDisabled={!isEditing}
                onChange={handleAddressChange}
                placeholder="Complemento"
                variant="filled"
              />
            </FormLabel>
          </HStack>

          <FormLabel fontSize="xs" fontWeight="light">
            Bairro
            <Input
              name="neighborhood"
              value={data.address.neighborhood}
              isDisabled={!isEditing}
              onChange={handleAddressChange}
              placeholder="Bairro"
              variant="filled"
            />
          </FormLabel>
          <FormLabel fontSize="xs" fontWeight="light">
            Cidade
            <Input
              name="city"
              value={data.address.city}
              isDisabled={!isEditing}
              onChange={handleAddressChange}
              placeholder="Cidade"
              variant="filled"
            />
          </FormLabel>
          <FormLabel fontSize="xs" fontWeight="light">
            Estado
            <Input
              name="state"
              value={data.address.state}
              isDisabled={!isEditing}
              onChange={handleAddressChange}
              placeholder="Estado"
              variant="filled"
            />
          </FormLabel>
        </VStack>
        <Button
          display={{ base: "flex", md1: "none" }}
          variant={"button"}
          mt={4}
          onClick={() => {
            if (isEditing) {
              onOpen();
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? "Salvar alterações" : "Editar"}
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Alterações</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Tem certeza de que deseja salvar as alterações?</Text>
          </ModalBody>
          <ModalFooter>
            <Button w={"full"} variant={"button"} mr={3} onClick={handleSave}>
              Sim
            </Button>
            <Button
              w={"full"}
              variant="outline"
              color={"red"}
              borderColor={"red"}
              onClick={onClose}
            >
              Não
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default UserData;
