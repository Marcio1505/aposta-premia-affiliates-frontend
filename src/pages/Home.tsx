import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  VStack,
  Text,
  HStack,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  useColorModeValue,
  Collapse,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../api";
import {
  billList,
  chart,
  clipboard,
  iconLogo,
  logo,
  logout_icon,
  share,
  tranlaction,
  transfer,
  wallet,
} from "../assets";
import { useQuery } from "react-query";
import {
  Dashboard,
  MarketingTools,
  MarketingLinks,
  CommissionsPlan,
  Payments,
  PostbackSettings,
  PostbackLogs,
  ReportMedia,
  ReportsReceives,
  ReportActivities,
  ReportEarnings,
} from "../components/tabs";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data } = useQuery(
    "userProfile",
    async () => {
      const token = localStorage.getItem("token");
      if (token) {
        return await userProfile(token);
      }
      return null;
    },
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      enabled: !!token,
    }
  );

  const isLoggedIn = !!data;
  const profilePicture = data?.profilePicture || "";
  const userName = data?.firstName || "";
  const email = data?.email || "";

  const [isTabListVisible, setTabListVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>(
    {}
  );
  const [selectedSubTabs, setSelectedSubTabs] = useState<
    Record<number, number>
  >({});

  // Cores
  const bgColor = useColorModeValue("white", "gray.800");
  const hoverColor = useColorModeValue("gray.100", "purple.900");
  const selectedColor = useColorModeValue("primary", "gray.100");
  const textColor = useColorModeValue("black", "white");

  const mainTabs = [
    { icon: chart, label: "Visão Geral", component: <Dashboard /> },
    {
      icon: tranlaction,
      label: "Ferramentas de Marketing",
      isDropdown: true,
      subTabs: [
        { label: "Todas as Ferramentas", component: <MarketingTools /> },
        { label: "Links Padrão", component: <MarketingLinks /> },
      ],
    },
    {
      icon: clipboard,
      label: "Relatórios",
      isDropdown: true,
      subTabs: [
        { label: "Relatorio de Mídia", component: <ReportMedia /> },
        { label: "Relatorio de Atividades", component: <ReportActivities /> },
        { label: "Relatorio de Recebimentos", component: <ReportsReceives /> },
        { label: "Relatorio de Ganhos", component: <ReportEarnings /> },
      ],
    },
    { icon: wallet, label: "Pagamentos", component: <Payments /> },
    {
      icon: transfer,
      label: "Postbacks",
      isDropdown: true,
      subTabs: [
        { label: "Logs do Postback", component: <PostbackLogs /> },
        { label: "Configurações de Postback", component: <PostbackSettings /> },
      ],
    },
    {
      icon: share,
      label: "Configuração de APIs",
      component: <ReportEarnings />,
    },
    {
      icon: chart,
      label: "Sub Afliliados",
      isDropdown: true,
      subTabs: [
        {
          label: "Configurações de Sub Afliliados",
          component: <PostbackLogs />,
        },
        { label: "Links de Sub Afliliados", component: <PostbackSettings /> },
      ],
    },
    {
      icon: billList,
      label: "Plano de Comissão",
      component: <CommissionsPlan />,
    },
  ];

  const handleTabClick = (index: number) => {
    if (mainTabs[index].isDropdown) {
      setOpenDropdowns((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
      if (selectedTab !== index) {
        setSelectedTab(index);
        if (selectedSubTabs[index] === undefined) {
          setSelectedSubTabs((prev) => ({
            ...prev,
            [index]: 0,
          }));
        }
      }
    } else {
      setOpenDropdowns({});
      setSelectedTab(index);
    }
  };

  const handleSubTabClick = (tabIndex: number, subTabIndex: number) => {
    setSelectedSubTabs((prev) => ({
      ...prev,
      [tabIndex]: subTabIndex,
    }));
  };

  return (
    <Box display="flex" flexDirection="column" minH="100vh" overflowX="hidden">
      <Box flex="1" display="flex" w="full" maxW="100vw" overflowX="hidden">
        <Tabs
          variant="unstyled"
          h="full"
          orientation="vertical"
          index={selectedTab}
          onChange={handleTabClick}
          w="full"
        >
          <VStack
            bg={bgColor}
            h="full"
            w={isTabListVisible ? "250px" : "70px"}
            position="fixed"
            left={0}
            top={0}
            bottom={0}
            justifyContent="space-between"
            onMouseEnter={() => setTabListVisible(true)}
            onMouseLeave={() => setTabListVisible(false)}
            transition="width 0.2s ease-in-out"
            zIndex="sticky"
            boxShadow="md"
          >
            <Box w="full" px={2} overflow="hidden">
              <Box p={2}>
                <Image
                  src={logo}
                  display={isTabListVisible ? "flex" : "none"}
                  w="110px"
                  my={3}
                  mr="auto"
                  alt="Logo"
                  transition="all 0.2s ease-in-out"
                />
                <Image
                  src={iconLogo}
                  display={isTabListVisible ? "none" : "flex"}
                  w="30px"
                  my={3}
                  mr="auto"
                  alt="Logo"
                  transition="all 0.2s ease-in-out"
                />
              </Box>
              <Divider />

              <Box p={4} color={textColor}>
                {isLoggedIn ? (
                  <Button
                    variant="unstyled"
                    onClick={() => navigate("/profile")}
                    display="flex"
                    w="full"
                  >
                    <HStack
                      justifyContent={
                        isTabListVisible ? "flex-start" : "center"
                      }
                      w="full"
                    >
                      <Avatar name={userName} src={profilePicture} size="md" />
                      {isTabListVisible && (
                        <VStack gap={0} alignItems="start" ml={2}>
                          <Text fontSize="sm" noOfLines={1}>
                            {userName}
                          </Text>
                          <Text fontSize="xs" fontWeight="light" noOfLines={1}>
                            {email}
                          </Text>
                        </VStack>
                      )}
                    </HStack>
                  </Button>
                ) : (
                  <HStack
                    justifyContent={isTabListVisible ? "flex-start" : "center"}
                  >
                    <Avatar name={userName} src={profilePicture} size="md" />
                    {isTabListVisible && (
                      <VStack align="start" spacing={1} ml={2}>
                        <Button
                          variant="unstyled"
                          h={4}
                          fontSize="sm"
                          onClick={() => navigate("/login")}
                        >
                          Entrar
                        </Button>
                        <Button
                          variant="unstyled"
                          h={4}
                          fontSize="sm"
                          fontWeight="light"
                          onClick={() => navigate("/register")}
                        >
                          ou Criar conta
                        </Button>
                      </VStack>
                    )}
                  </HStack>
                )}
              </Box>
              <Divider />

              <TabList
                h="full"
                alignItems="start"
                flexDir="column"
                p={1}
                mt={2}
                w="full"
              >
                {mainTabs.map((tab, index) => (
                  <Box key={index} w="full">
                    <Tab
                      borderRadius={12}
                      mb={1}
                      w="full"
                      justifyContent={
                        isTabListVisible ? "flex-start" : "center"
                      }
                      px={3}
                      py={2}
                      _hover={{ bg: hoverColor }}
                      _selected={{
                        bg: selectedColor,
                        color: "white",
                        "& img": {
                          filter: "brightness(0) invert(1)",
                        },
                      }}
                      transition="all 0.2s ease-in-out"
                    >
                      <Image
                        src={tab.icon}
                        w="20px"
                        h="20px"
                        filter={
                          selectedTab === index
                            ? "brightness(0) invert(1)"
                            : "none"
                        }
                        transition="filter 0.2s ease-in-out"
                      />
                      {isTabListVisible && (
                        <HStack flex={1} justifyContent="space-between" ml={3}>
                          <Text
                            fontSize="sm"
                            textAlign={"start"}
                            fontWeight={"bold"}
                          >
                            {tab.label}
                          </Text>
                          {tab.isDropdown && isTabListVisible && (
                            <Box
                              as={
                                openDropdowns[index] && selectedTab === index
                                  ? IoIosArrowUp
                                  : IoIosArrowDown
                              }
                              w="16px"
                              h="16px"
                            />
                          )}
                        </HStack>
                      )}
                    </Tab>

                    {tab.isDropdown && isTabListVisible && (
                      <Collapse
                        in={openDropdowns[index] && selectedTab === index}
                      >
                        <VStack align="start" pl={2} spacing={0}>
                          {tab.subTabs.map((subTab, subIndex) => (
                            <Button
                              key={subIndex}
                              variant="ghost"
                              w="full"
                              justifyContent="flex-start"
                              py={2}
                              fontSize="sm"
                              fontWeight="bold"
                              borderRadius={12}
                              border={"2px solid "}
                              borderColor={
                                selectedSubTabs[index] === subIndex
                                  ? "#491474"
                                  : "transparent"
                              }
                              color={
                                selectedSubTabs[index] === subIndex
                                  ? "primary"
                                  : "black"
                              }
                              onClick={() => handleSubTabClick(index, subIndex)}
                              _hover={{ bg: hoverColor }}
                            >
                              {subTab.label}
                            </Button>
                          ))}
                        </VStack>
                      </Collapse>
                    )}
                  </Box>
                ))}
              </TabList>
            </Box>
            <Button
              variant="ghost"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              w="full"
              justifyContent={isTabListVisible ? "flex-start" : "center"}
              px={3}
              py={2}
              _hover={{ bg: hoverColor }}
            >
              <Image src={logout_icon} w="20px" h="20px" alt="Logout Icon" />
              {isTabListVisible && (
                <Text ml={3} color="red" fontWeight="light" fontSize="sm">
                  Logout
                </Text>
              )}
            </Button>
          </VStack>

          <TabPanels
            ml={isTabListVisible ? "250px" : "70px"}
            transition="margin-left 0.2s ease-in-out"
            w="calc(100% - 70px)"
            maxW="calc(100vw - 70px)"
            overflowX="hidden"
          >
            {mainTabs.map((tab, index) => (
              <TabPanel
                key={index}
                mx="auto"
                w="full"
                bg={"#f5f5f5"}
                maxW="1600px"
                p={4}
                overflowX="hidden"
              >
                {tab.isDropdown
                  ? tab.subTabs[selectedSubTabs[index] || 0]?.component
                  : tab.component}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
