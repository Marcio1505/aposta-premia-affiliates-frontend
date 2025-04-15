import {
  Box,
  Heading,
  Input,
  Text,
  Button,
  Divider,
  VStack,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";

export default function MarketingSettings() {
  const [defaultShareLink, setDefaultShareLink] = useState("");
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);

  const handleSaveSettings = () => {
    // Aqui você pode adicionar lógica para salvar as configurações
    console.log("Configurações salvas:", {
      defaultShareLink,
      isTrackingEnabled,
    });
  };

  return (
    <Box p={4} w={"100%"}>
      <Heading mb={6} mx="auto" maxW={"1200px"} textAlign="center">
        Configurações de Marketing
      </Heading>

      {/* Configurações de Links de Compartilhamento */}
      <Box mb={6}>
        <Heading size="sm" mb={2}>
          Link Padrão de Compartilhamento
        </Heading>
        <Input
          type="url"
          value={defaultShareLink}
          onChange={(e) => setDefaultShareLink(e.target.value)}
          placeholder="https://example.com/share"
          minW="300px"
        />
      </Box>

      <Divider my={6} />

      {/* Outras Configurações de Marketing */}
      <Box>
        <Heading size="sm" mb={2}>
          Outras Configurações
        </Heading>
        <VStack spacing={4} align="stretch">
          <Box>
            <Text>Habilitar Rastreamento</Text>
            <Switch
              isChecked={isTrackingEnabled}
              onChange={() => setIsTrackingEnabled((prev) => !prev)}
            >
              {isTrackingEnabled ? "Desativar" : "Ativar"}
            </Switch>
          </Box>
        </VStack>
      </Box>

      <Button mt={6} variant={"button"} onClick={handleSaveSettings}>
        Salvar Configurações
      </Button>
    </Box>
  );
}
