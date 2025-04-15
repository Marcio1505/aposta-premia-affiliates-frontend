import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { handMoney, imageDefault } from "../../assets";

interface PartnerCardProps {
  imageUrl: string;
  partnerName: string;
  valor?: string;
  cashback?: string;
  onClick: () => void;
  isCashback: boolean;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  imageUrl,
  partnerName,
  valor,
  cashback,
  onClick,
  isCashback,
}) => {
  return (
    <VStack
      zIndex={1}
      p={{ base: 2, md1: 4, xl: 6 }}
      borderWidth="1px"
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      borderRadius={14}
      minW={30}
      h={{ base: "auto", md1: "100%" }}
      border={"1px solid #d1d1d153"}
      bg={"white"}
      cursor="pointer"
      onClick={onClick}
    >
      <Box
        w={"100%"}
        h={{
          base: "160px",
          md: "160px",
          md1: "160px",
          lg: "230px",
          xl2: "200px",
        }}
      >
        <Image
          src={imageUrl}
          borderRadius={10}
          alt={partnerName}
          objectFit="contain"
          border="1px solid #f1f2f5"
          w={"full"}
          h={"95%"}
          my={"auto"}
        />
      </Box>
      <Text fontWeight="bold" fontSize={{ base: "md", md1: "lg" }}>
        {partnerName}
      </Text>
      {isCashback ? (
        <>
          <Text display={{ base: "none", md1: "block" }}>
            Deposite na <b>{partnerName}</b> hoje e ganhe exclusivamente{" "}
          </Text>
          <HStack
            display="flex"
            flexWrap="wrap"
            spacing={1}
            fontSize={{ base: "md", md1: "sm" }}
            color={{ base: "Black", md1: "White" }}
            bg={{ base: "none", md1: "brand.primary" }}
            borderRadius={20}
            p={{ base: 0, md1: 2 }}
            mt={"auto"}
            mb={2}
          >
            <Image display={{ base: "none", md1: "inline" }} src={handMoney} />
            <Text fontWeight="bold">
              {Math.round(parseFloat(cashback || "0"))}%
            </Text>
            <Text>de cashback</Text>
          </HStack>
          <Button
            w={"full"}
            h={{ base: "50px", md1: "60px" }}
            variant={"outline"}
            fontSize={{ base: "sm", md1: "md" }}
            p={"auto"}
          >
            Ir Para Oferta
          </Button>
        </>
      ) : (
        <>
          <Text display={{ base: "none", md1: "block" }}>
            Compre com seu saldo
          </Text>
          <HStack
            display="flex"
            flexWrap="wrap"
            justifyContent={"center"}
            fontSize={{ base: "md", md1: "sm" }}
            color={{ base: "Black", md1: "White" }}
            bg={{ base: "none", md1: "brand.primary" }}
            borderRadius={20}
            px={{ base: 0, md1: 4 }}
            py={{ base: 0, md1: 1 }}
            alignItems="flex-end"
            spacing={1}
          >
            <Text fontSize={"sm"}> Apenas R$</Text>
            <Text fontWeight="bold">{valor?.replace(".", ",")}</Text>
          </HStack>
          <Button
            w={"full"}
            h={{ base: "50px", md1: "60px" }}
            variant={"button"}
            p={"auto"}
            fontSize={{ base: "sm", md1: "md" }}
          >
            Compre Agora
          </Button>
        </>
      )}
    </VStack>
  );
};

export const PartnerIconCircle: React.FC<{
  imageUrl: string;
  partnerName: string;
  onClick?: () => void;
}> = ({ imageUrl, partnerName, onClick }) => (
  <Image
    cursor="pointer"
    src={imageUrl || imageDefault}
    borderRadius={100}
    boxSize="80px"
    objectFit="contain"
    w={"5.5rem"}
    h={"5.5rem"}
    alt={partnerName}
    border={"1px solid #f1f2f5"}
    mb={2}
    onClick={onClick}
  />
);
