import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  List,
  ListItem,
  Input,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../../../components/common/Footer";
import { FiArrowLeftCircle } from "react-icons/fi";
import {
  logout_icon,
  logo,
  pen,
  avatarDefault,
  user,
  lock,
  help,
} from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useQuery, useQueryClient } from "react-query";
import {
  userProfile,
  updateProfilePicture,
  deleteProfilePicture,
} from "../../../api";
import { useState, useEffect } from "react";
import UserData from "./UserData";
import ChangePassword from "./AccountSecuriry";
import Load from "../../../components/common/Load";
import HelpAndFaq from "./Help";

export default function Profile() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isDesktop) {
      setActiveTab("refer-earn");
    } else {
      setActiveTab(null);
    }
  }, [isDesktop, token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { data, error, isLoading } = useQuery(
    "userData",
    () => userProfile(token),
    {
      enabled: true,
      staleTime: 1 * 60 * 1000,
      cacheTime: 1 * 60 * 1000,
      onSuccess: (data) => {
        setProfilePictureUrl(data.profilePicture || newProfilePicture);
        queryClient.invalidateQueries("onboardingStatusProfile");
      },
    }
  );

  const handleBackClick = () => {
    navigate("/");
  };

  const handleProfilePictureChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setNewProfilePicture(file);
      const updatedProfilePictureUrl = await updateProfilePicture(token, file);
      setProfilePictureUrl(updatedProfilePictureUrl);
      queryClient.invalidateQueries("userData");
    }
  };

  const handleDeleteProfilePicture = async () => {
    await deleteProfilePicture(token);
    setProfilePictureUrl(null);
    queryClient.invalidateQueries("userData");
  };

  if (isLoading) return <Load isLoading={isLoading} />;

  if (error)
    return (
      <VStack w={"full"} justifyContent={"center"} h={"100vh"}>
        <Text textAlign={"center"} mb={8}>
          Login expirado, por favor efetue o login novamente
        </Text>
        <Button variant={"button"} onClick={handleLogout}>
          Voltar para o login
        </Button>
      </VStack>
    );

  const firstName = data?.firstName || "";
  const email = data?.email || "";

  const renderContent = () => {
    switch (activeTab) {
      case "account-security":
        return <ChangePassword />;
      case "user-data":
        return <UserData />;
      case "help":
        return <HelpAndFaq />;
      default:
        return null;
    }
  };

  return (
    <VStack
      overflowX={"hidden"}
      display="flex"
      justifyContent="center"
      color={"#000"}
    >
      <Box minH="auto" w={"100%"}>
        <HStack
          display={{ base: "flex", md1: "none" }}
          bg={"primary"}
          w={"full"}
          justifyContent={"space-between"}
          p={6}
        >
          <Button onClick={handleBackClick} width={"15px"} variant={"unstyled"}>
            <FiArrowLeftCircle color="white" size={24} />
          </Button>
          <Button variant={"unstyled"} onClick={handleBackClick}>
            <Image src={logo} borderRadius="10px" w={90} alt="Aposta Premia" />
          </Button>
          <Box w="24px" />
        </HStack>
      </Box>
      <HStack
        maxW={1400}
        display={{ base: "none", md1: "flex" }}
        alignItems="center"
        w="full"
        p={4}
      >
        <Button onClick={handleBackClick} variant="unstyled">
          <FiArrowLeftCircle color="primary" size={24} />
        </Button>
        <Text fontSize="3xl" fontWeight="bold" color="primary">
          Meu Perfil
        </Text>
      </HStack>

      <HStack
        maxW={1400}
        mx={"auto"}
        alignItems={"stretch"}
        flexDir={{ base: "column", md1: "row" }}
        p={4}
        w="full"
      >
        <VStack
          w={{ base: "100%", md1: "40%" }}
          align="center"
          spacing={5}
          border={{ base: "none", md1: "1px solid #E2E8F0" }}
          borderRadius={12}
          p={{ base: 0, md1: "35px" }}
        >
          <Box position="relative" mt={5}>
            <Box border="1px solid #f2f2f2" borderRadius={"50%"} p={0}>
              <Avatar size="2xl" src={profilePictureUrl || avatarDefault} />
            </Box>

            <Button
              id="edit-profile"
              variant="unstyled"
              borderRadius={100}
              color={"white"}
              display={"flex"}
              position={"absolute"}
              bottom={"1px"}
              right={"1"}
              onClick={onOpen}
            >
              <Image src={pen} w={10} />
            </Button>
          </Box>
          <Box textAlign={"center"}>
            <Text fontSize="xl" fontWeight="bold">
              {firstName}
            </Text>
            <Text fontSize="sm">{email}</Text>
          </Box>

          <List
            mt={3}
            w="full"
            border={"1px solid #E2E8F0"}
            color={"primary"}
            borderRadius={12}
            fontWeight={"bold"}
          >
            <ListItem
              borderBottom={"1px solid #E2E8F0"}
              p={"1.2rem 1rem"}
              onClick={() => setActiveTab("user-data")}
              _hover={{ cursor: "pointer", bg: "#f9f9f9" }}
            >
              <HStack>
                <Image src={user} />
                <Text>Meus Dados</Text>
              </HStack>
            </ListItem>
            <ListItem
              borderBottom={"1px solid #E2E8F0"}
              p={"1.2rem 1rem"}
              onClick={() => setActiveTab("account-security")}
              _hover={{ cursor: "pointer", bg: "#f9f9f9" }}
            >
              <HStack>
                <Image src={lock} />
                <Text>Segurança</Text>
              </HStack>
            </ListItem>
            <ListItem
              borderBottom={"1px solid #E2E8F0"}
              p={"1.2rem 1rem"}
              onClick={() => setActiveTab("help")}
              _hover={{ cursor: "pointer", bg: "#f9f9f9" }}
            >
              <HStack>
                <Image src={help} />
                <Text>Ajuda</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <ListItem
                justifyContent="space-between"
                onClick={handleLogout}
                p={"1.2rem 1rem"}
                _hover={{ cursor: "pointer", bg: "#f9f9f9" }}
              >
                <HStack color={"red"}>
                  <Image src={logout_icon} />
                  <Text>Sair</Text>
                </HStack>
              </ListItem>
            </ListItem>
          </List>
        </VStack>
        <VStack
          id="modals-desktop"
          w={{ base: "100%", md1: "58%" }}
          h={"full"}
          position={{
            base: activeTab ? "absolute" : "relative",
            md1: "relative",
          }}
          top={0}
          left={0}
          bg={{ base: "white", md1: "transparent" }}
          zIndex={{ base: activeTab ? 10 : 1, md1: 1 }}
        >
          {!isDesktop && activeTab && (
            <Box position="relative" w="full" h="full">
              <HStack
                display={{ base: "flex", md1: "none" }}
                bg={"primary"}
                w={"full"}
                justifyContent={"space-between"}
                p={6}
              >
                <Button
                  onClick={() => setActiveTab(null)}
                  width={"15px"}
                  variant={"unstyled"}
                >
                  <FiArrowLeftCircle color="white" size={24} />
                </Button>
                <Button variant={"unstyled"} onClick={handleBackClick}>
                  <Image
                    src={logo}
                    borderRadius="10px"
                    w={90}
                    alt="Aposta Premia"
                  />
                </Button>
                <Box w="24px" />
              </HStack>
              {renderContent()}
              <Box mt={8} display={{ base: "block", md1: "none" }}>
                <Footer />
              </Box>
            </Box>
          )}
          {isDesktop && activeTab && (
            <Box
              border={"1px solid #E2E8F0"}
              borderRadius={12}
              position="relative"
              ml={6}
              w="full"
              h="full"
            >
              {renderContent()}
            </Box>
          )}
        </VStack>
      </HStack>

      <Box display={!isDesktop && activeTab ? "none" : "block"} w={"full"}>
        <Footer />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={290} p={2}>
          <ModalHeader>Editar Foto de Perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {profilePictureUrl ? (
                <Button
                  variant={"outline"}
                  w={"full"}
                  onClick={async () => {
                    await handleDeleteProfilePicture();
                    window.location.reload();
                  }}
                >
                  Remover Foto de Perfil
                </Button>
              ) : (
                <Button
                  as="label"
                  htmlFor="profile-picture-input"
                  variant={"button"}
                  w={"full"}
                >
                  Adicionar Foto de Perfil
                  <Input
                    id="profile-picture-input"
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      await handleProfilePictureChange(event);
                      window.location.reload();
                    }}
                    display="none"
                  />
                </Button>
              )}
              {profilePictureUrl && (
                <Button
                  as="label"
                  htmlFor="profile-picture-input"
                  variant={"button"}
                  w={"full"}
                >
                  Alterar Foto de Perfil
                  <Input
                    id="profile-picture-input"
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      await handleProfilePictureChange(event);
                      window.location.reload();
                    }}
                    display="none"
                  />
                </Button>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
