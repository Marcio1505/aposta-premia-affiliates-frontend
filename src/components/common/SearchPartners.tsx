import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  Button,
  Spinner,
  Select,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Image,
  ModalFooter,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { searchPartners } from "../../api";
import Footer from "./Footer";
import { useInView } from "react-intersection-observer";
import { Partner } from "../../types";
import { imageDefault, notFound } from "../../assets";
import { PartnerCard } from "./PartnersCard";
import { IoIosSearch } from "react-icons/io";
import Load from "./Load";
import { CloseIcon } from "@chakra-ui/icons";
import { HiArrowsUpDown } from "react-icons/hi2";
import { MdOutlineFilterList } from "react-icons/md";

const SearchPartners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("score");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("cashback");
  const [selectedSortBy, setSelectedSortBy] = useState("score");
  const { ref, inView } = useInView();
  const [changeFilter, setChangeFilter] = useState("score");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPartnerOpen, setIsModalPartnerOpen] = useState(false);

  const cashbackOPT =
    filterOption === "cashback" || filterOption === "all" ? true : null;
  const offersOPT =
    filterOption === "offers" || filterOption === "all" ? true : null;

  const cashbackType = filterOption === "cashback" ? true : false;

  const { isLoading, isError, data, refetch } = useQuery(
    ["partners", page, searchTerm, sortBy, sortOrder, filterOption],
    () =>
      searchPartners(
        30,
        page,
        searchTerm,
        undefined,
        sortBy,
        sortOrder,
        cashbackOPT,
        offersOPT
      ),
    {
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 30,
      onSuccess: (data) => {
        setPartners((prev) => [...prev, ...data.partners]);
      },
    }
  );

  const totalPages = data?.totalPages;

  const navigateToPartner = (partnerId: string) => {
    if (filterOption === "offers") {
      window.location.href = `/offer/${partnerId}`;
    } else {
      window.location.href = `/partner/${partnerId}`;
    }
  };

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    setPage(1);
    setPartners([]);
    refetch();
  }, [sortBy, searchTerm, sortOrder, filterOption]);

  const applyFilter = () => {
    setSortBy(selectedSortBy);
    setSortOrder(filterOption === "cashback" ? "desc" : "asc");
    setPartners([]);
    setPage(1);
    refetch();
  };

  useEffect(() => {
    setSortOrder(filterOption === "cashback" ? "asc" : "asc");
    setPartners([]);
    setPage(1);
    refetch();
  }, [filterOption]);

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSortBy(value);
  };

  const groupPartnersByLetter = (partners: Partner[]) => {
    return partners.reduce((acc, partner) => {
      const firstLetter = partner.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(partner);
      return acc;
    }, {} as Record<string, Partner[]>);
  };

  const groupedPartners =
    sortBy === "name" ? groupPartnersByLetter(partners) : { All: partners };

  return (
    <VStack display="flex" color="#000" w="100%" mx="auto">
      <HStack width="full" justifyContent="space-between" p={6}>
        <InputGroup>
          <Input
            bg="white"
            placeholder="Pesquisar por parceiro"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            _placeholder={{ color: "#999" }}
          />
          <InputRightElement>
            <Button variant="unstyled">
              <IoIosSearch size={26} color="#999" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </HStack>

      {isLoading ? (
        <Load isLoading={isLoading} />
      ) : (
        searchTerm && (
          <Box w={"100vw"}>
            <VStack maxW={"1370px"} mx={"auto"} w="full">
              <Box p={{ base: 4, md1: 8 }} width={"100%"} mx={"auto"}>
                <HStack justifyContent="space-between" w="full">
                  <Box width={25} />
                </HStack>
                <HStack w={"100%"} justifyContent="flex-end">
                  <Button
                    variant="ghost"
                    onClick={() => setSearchTerm("")}
                    size="sm"
                    colorScheme="red"
                  >
                    <CloseIcon />
                  </Button>
                </HStack>

                <Heading
                  as="h3"
                  textAlign={{ base: "center", md1: "start" }}
                  color="primary"
                  fontSize="1.5em"
                >
                  <Box display={"inline"} fontWeight={"black"}>
                    Resultados de pesquisa para{" "}
                  </Box>
                  "{searchTerm}"
                </Heading>
                <Text
                  textAlign={{ base: "center", md1: "start" }}
                  my={5}
                  color="primary"
                >
                  {partners.length} parceiro encontradas
                </Text>

                <HStack spacing={0} display={{ base: "flex", md1: "none" }}>
                  <Box
                    w="full"
                    border="1px solid #491474"
                    borderRadius="12px 0 0 12px"
                    p={3}
                  >
                    <Text>Ordenar por</Text>
                    <Button
                      variant="link"
                      color="black"
                      w="full"
                      justifyContent="space-between"
                      onClick={() => setIsModalOpen(true)}
                      rightIcon={<HiArrowsUpDown />}
                    >
                      {changeFilter === "score" && "Mais relevantes"}
                      {changeFilter === "name" && "Alfabetico A-Z"}
                      {changeFilter === "produto_valor" && "Menor valor"}
                      {changeFilter === "cashback_perc" && "Maior Cashback"}
                    </Button>
                  </Box>
                  <Box
                    w="full"
                    border="1px solid #491474"
                    borderRadius="0 12px 12px 0"
                    borderLeft="none"
                    p={3}
                  >
                    <Text>Filtrar por</Text>
                    <Button
                      variant="link"
                      color="black"
                      w="full"
                      justifyContent="space-between"
                      onClick={() => setIsModalPartnerOpen(true)}
                      rightIcon={<MdOutlineFilterList />}
                    >
                      {filterOption === "cashback" && "Cashback"}
                      {filterOption === "offers" && "Ofertas"}
                    </Button>
                  </Box>
                </HStack>
                <Box
                  display={{ base: "none", md1: "flex" }}
                  justifyContent={"space-between"}
                  w={"100%"}
                >
                  <HStack spacing={4}>
                    <Box>
                      <Text fontSize={12} mb={2}>
                        Ordenação
                      </Text>
                      <Select
                        value={selectedSortBy}
                        variant="filled"
                        w={60}
                        onChange={handleSortByChange}
                        display={cashbackType ? "none" : "block"}
                      >
                        <option value="score">Padrão</option>
                        <option value="name">Ordem Alfabética (A-Z)</option>
                        <option value="produto_valor">Menor Valor</option>
                      </Select>
                      <Select
                        value={selectedSortBy}
                        variant="filled"
                        w={60}
                        onChange={handleSortByChange}
                        display={cashbackType ? "block" : "none"}
                      >
                        <option value="score">Padrão</option>
                        <option value="name">Ordem Alfabética (A-Z)</option>
                        <option value="cashback_perc">Maior Cashback</option>
                      </Select>
                    </Box>
                    <Box mr={12}>
                      <Text fontSize={12} mb={2}>
                        Filtro
                      </Text>
                      <Select
                        variant="filled"
                        w={60}
                        value={filterOption}
                        onChange={(e) => {
                          setFilterOption(e.target.value);
                        }}
                      >
                        <option value="cashback">Cashback</option>
                        <option value="offers">Ofertas</option>
                      </Select>
                    </Box>
                  </HStack>

                  <Button
                    w={"15rem"}
                    mt={4}
                    size="sm"
                    variant={"button"}
                    py={6}
                    onClick={applyFilter}
                  >
                    Aplicar Filtro
                  </Button>
                </Box>
                {isLoading && <Spinner />}
                {isError && <Text>Error loading partners</Text>}
                {partners.length === 0 ? (
                  <VStack my={20} justifyContent="center" w="full">
                    <Image src={notFound} />
                    <Text color="gray.500">Nenhum parceiro encontrado</Text>
                  </VStack>
                ) : (
                  Object.keys(groupedPartners).map((letter) => (
                    <Box key={letter} my={6}>
                      {sortBy === "name" && (
                        <Heading
                          size={{ base: "sm", md1: "2xl" }}
                          color={{ base: "black", md1: "primary" }}
                          m={{ base: "2rem 0 1rem 0", md1: "4rem 0 2rem 0" }}
                        >
                          {letter}
                        </Heading>
                      )}
                      <Grid
                        mt={3}
                        zIndex={10}
                        alignItems="stretch"
                        templateColumns={{
                          sm: "repeat(auto-fill, minmax(130px, 1fr))",
                          md1: "repeat(4, minmax(150px, 1fr))",
                          lg: "repeat(4, minmax(170px, 1fr))",
                          xl: "repeat(5, minmax(170px, 1fr))",
                          xl2: "repeat(6, minmax(170px, 1fr))",
                        }}
                        gap={4}
                      >
                        {groupedPartners[letter].map((partner) => (
                          <PartnerCard
                            key={partner.partner_id}
                            imageUrl={partner.logo || imageDefault}
                            partnerName={partner.name}
                            cashback={`${partner.cashback_perc}%`}
                            valor={`${partner.produto_valor}`}
                            onClick={() => navigateToPartner(partner._id)}
                            isCashback={cashbackType}
                          />
                        ))}
                      </Grid>
                    </Box>
                  ))
                )}
                <Box ref={ref} />
                {(partners.length === 0 && !isLoading) ||
                  (totalPages <= page && (
                    <Text w={"full"} textAlign={"center"} my={8}>
                      Parece que isso é tudo!
                    </Text>
                  ))}
              </Box>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                motionPreset="slideInBottom"
              >
                <ModalOverlay display={{ base: "inline", md1: "none" }} />
                <ModalContent
                  display={{ base: "inline", md1: "none" }}
                  position="fixed"
                  bottom={0}
                  borderRadius="18px 18px 0 0"
                  m={0}
                  width="100vw"
                  maxWidth="100vw"
                >
                  <ModalHeader>Ordene por:</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <RadioGroup
                      onChange={(value) => {
                        setChangeFilter(value);
                        applyFilter();
                      }}
                      value={changeFilter}
                    >
                      <Stack
                        direction="column"
                        display={cashbackType ? "flex" : "none"}
                      >
                        <Radio value="score">Mais relevantes</Radio>
                        <Radio value="name">Alfabetico A-Z</Radio>
                        <Radio value="cashback_perc">Maior Cashback</Radio>
                      </Stack>
                      <Stack
                        direction="column"
                        display={cashbackType ? "none" : "flex"}
                      >
                        <Radio value="score">Mais relevantes</Radio>
                        <Radio value="name">Alfabetico A-Z</Radio>
                        <Radio value="produto_valor">Menor valor</Radio>
                      </Stack>
                    </RadioGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="button"
                      w="full"
                      onClick={() => {
                        setSortBy(changeFilter);
                        setIsModalOpen(false);
                        refetch();
                      }}
                    >
                      Aplicar ordenação
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={isModalPartnerOpen}
                onClose={() => setIsModalPartnerOpen(false)}
                motionPreset="slideInBottom"
              >
                <ModalOverlay display={{ base: "inline", md1: "none" }} />
                <ModalContent
                  display={{ base: "inline", md1: "none" }}
                  position="fixed"
                  bottom={0}
                  borderRadius="18px 18px 0 0"
                  m={0}
                  width="100vw"
                  maxWidth="100vw"
                >
                  <ModalHeader>Filtre por:</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <RadioGroup
                      onChange={(value) => {
                        setFilterOption(value);
                        setSortOrder(value === "cashback" ? "desc" : "asc");
                        setPartners([]);
                        setPage(1);
                        refetch();
                      }}
                      value={filterOption}
                    >
                      <Stack direction={"column"}>
                        <Radio value="cashback">Cashback</Radio>
                        <Radio value="offers">Ofertas</Radio>
                      </Stack>
                    </RadioGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="button"
                      w="full"
                      onClick={() => {
                        setPage(1);
                        setPartners([]);
                        refetch();
                        setIsModalPartnerOpen(false);
                      }}
                    >
                      Aplicar filtro
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </VStack>
            <Footer />
          </Box>
        )
      )}
    </VStack>
  );
};

export default SearchPartners;
