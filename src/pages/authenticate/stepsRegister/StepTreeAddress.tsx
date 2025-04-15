import { Box, VStack, Text, Button, Image, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { TextField } from "../../../components/ui/form/TextField";
import { logo } from "../../../assets";
import { useEffect, useState } from "react";
import { IRegister } from "./MultiStepForm";
import { cidadeEstado } from "./CitiesStates";

const estados = cidadeEstado.map((estado) => ({
  sigla: estado.sigla,
  nome: estado.nome,
}));

const cidadesPorEstado = cidadeEstado.reduce((acc, estado) => {
  acc[estado.sigla] = estado.municipios.map((municipio) => municipio.nome);
  return acc;
}, {} as Record<string, string[]>);

interface StepTreeAddressProps {
  handleFinalSubmit: (data: IRegister) => void;
  prevStep: () => void;
}

export const StepTreeAddress = ({
  handleFinalSubmit,
  prevStep,
}: StepTreeAddressProps) => {
  const { handleSubmit, setValue, watch } = useFormContext();
  const [cidades, setCidades] = useState<string[]>([]);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detecta se é Safari no iOS
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari =
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome");
    setIsIOS(isIos && isSafari);
  }, []);

  const fetchCepData = async (cep: string) => {
    const cleanedCep = cep.replace(/\D/g, "");
    if (cleanedCep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cleanedCep}/json/`
        );

        const data = response?.data;

        if (!data.erro) {
          setValue("street", data.logradouro);
          setValue("neighborhood", data.bairro);
          setValue("city", data.localidade);
          setValue("state", data.uf);
          setCidades(cidadesPorEstado[data.uf] || []);
        } else {
          console.error("CEP não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        setValue("street", "");
        setValue("neighborhood", "");
        setValue("city", "");
        setValue("state", "");
        setCidades([]);
      }
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "cep") {
        fetchCepData(value.cep);
      } else if (name === "state") {
        setCidades(cidadesPorEstado[value.state] || []);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: IRegister) => {
    handleFinalSubmit(data);
  };

  return (
    <Box
      minH={{ base: isIOS ? "calc(100vh + 200px)" : "100vh", md: "100vh" }}
      display="flex"
      justifyContent="center"
      alignItems={{ base: "start", md1: "center" }}
      color={{ base: "primary", md1: "white" }}
    >
      <Box w={"100%"}>
        <HStack
          width={"100%"}
          display={{ base: "flex", md1: "none" }}
          justifyContent="space-between"
          alignItems="center"
          bg={"brand.primary"}
          p={6}
        >
          <Button
            variant="link"
            colorScheme="blue"
            justifyContent="start"
            onClick={prevStep}
          >
            <HiOutlineArrowLeftCircle color="white" size={30} />
          </Button>
          <Image src={logo} alt="Logo" w={90} />
          <Box w="30px" />
        </HStack>
        <Box p={6} mx={"auto"} maxW={"500px"}>
          <Text fontSize="xl" fontWeight="bold" mb={2} textAlign="start">
            Finalize seu cadastro
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack align="stretch" spacing={4}>
              <TextField
                label="CEP"
                placeholder="Insira seu CEP"
                name="cep"
                mask="99999-999"
              />
              <TextField
                label="Rua"
                _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                placeholder="Insira sua rua"
                name="street"
              />
              <HStack>
                <TextField
                  label="Número"
                  _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                  placeholder="Insira o número"
                  name="number"
                />
                <TextField
                  _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                  label="Complemento (Opcional)"
                  placeholder="Complemento"
                  name="complement"
                />
              </HStack>
              <TextField
                label="Bairro"
                _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                placeholder="Insira seu bairro"
                name="neighborhood"
              />
              <TextField
                label="Estado"
                _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                placeholder="Selecione ou digite seu estado"
                name="state"
                list="estados"
                onChange={(e) => setValue("state", e.target.value)}
              />
              <datalist id="estados">
                {estados.map((estado) => (
                  <option key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </option>
                ))}
              </datalist>
              <TextField
                label="Cidade"
                _focus={{ border: "1px solid #491474", bgColor: "#ffffff" }}
                placeholder="Selecione ou digite sua cidade"
                name="city"
                list="cidades"
                onChange={(e) => setValue("city", e.target.value)}
              />
              <datalist id="cidades">
                {cidades.map((cidade) => (
                  <option key={cidade} value={cidade}>
                    {cidade}
                  </option>
                ))}
              </datalist>

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
          </form>
        </Box>
      </Box>
    </Box>
  );
};
