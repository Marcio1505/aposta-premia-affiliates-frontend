import * as React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useSort } from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import {
  // Input,
  // InputGroup,
  // InputRightElement,
  Box,
  Text,
} from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";

interface TableReportActivitiesProps {
  search?: string;
}

interface Node {
  id: string;
  userId: string;
  depositos: string;
  depositosCount: number;
  retiradas: string;
  depositosLiquidos: string;
  comissoes: string;
  comissoesCount: number;
  nor: string;
  isTotal?: boolean;
}

const TableReportActivities: React.FC<TableReportActivitiesProps> = ({
  search = "",
}) => {
  const data = {
    nodes: [
      {
        id: "1",
        userId: "apap-fftc079a/356121",
        depositos: "R$ 0,00",
        depositosCount: 0,
        retiradas: "R$ 0,00",
        depositosLiquidos: "R$ 50,00",
        comissoes: "R$ 0,00",
        comissoesCount: 0,
        nor: '{"status":"success", "msg":"ac..."}',
      },
      {
        id: "2",
        userId: "apap-fftc079a/356121",
        depositos: "R$ 0,00",
        depositosCount: 5,
        retiradas: "R$ 0,00",
        depositosLiquidos: "R$ 452,05",
        comissoes: "R$ 0,00",
        comissoesCount: 0,
        nor: '{"status":"success", "msg":"ac..."}',
      },
      {
        id: "3",
        userId: "apap-fftc079a/356121",
        depositos: "R$ 0,00",
        depositosCount: 4,
        retiradas: "R$ 0,00",
        depositosLiquidos: "R$ 45,18",
        comissoes: "R$ 0,00",
        comissoesCount: 0,
        nor: '{"status":"success", "msg":"ac..."}',
      },
      {
        id: "4",
        userId: "apap-fftc079a/356121",
        depositos: "R$ 0,00",
        depositosCount: 2,
        retiradas: "R$ 0,00",
        depositosLiquidos: "R$ 0,00",
        comissoes: "R$ 0,00",
        comissoesCount: 0,
        nor: '{"status":"success", "msg":"ac..."}',
      },
      {
        id: "5",
        userId: "apap-fftc079a/356121",
        depositos: "R$ 0,00",
        depositosCount: 0,
        retiradas: "R$ 0,00",
        depositosLiquidos: "R$ 223,74",
        comissoes: "R$ 0,00",
        comissoesCount: 0,
        nor: '{"status":"success", "msg":"ac..."}',
      },
      {
        id: "6",
        isTotal: true,
        userId: "Total",
        depositos: "R$ 475.214,30",
        depositosCount: 12853,
        retiradas: "R$ 28.719,86",
        depositosLiquidos: "R$ 28.719,86",
        comissoes: "R$ 0,00",
        comissoesCount: 0,
        nor: "$55,820",
      },
    ] as Node[],
  };

  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns: repeat(8, minmax(0, 1fr));
      font-size: 14px;
    `,
    HeaderCell: `
      background-color: #f8f9fa;
      padding: 12px 16px;
      font-weight: 600;
      border-bottom: 2px solid #e9ecef;
      button {
        justify-content: space-between;
      }
    `,
    Cell: `
      padding: 12px 16px;
      border-bottom: 1px solid #e9ecef;
    `,
  };

  const theme = useTheme([getTheme(), customTheme]);

  const filteredData = {
    nodes: data.nodes.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    ),
  };

  const sort = useSort(
    filteredData,
    { onChange: () => {} },
    {
      sortFns: {
        USER_ID: (array) =>
          [...array].sort((a, b) => a.userId.localeCompare(b.userId)),
        DEPOSITOS: (array) =>
          [...array].sort(
            (a, b) =>
              parseFloat(a.depositos.replace(/[^\d,]/g, "").replace(",", ".")) -
              parseFloat(b.depositos.replace(/[^\d,]/g, "").replace(",", "."))
          ),
      },
    }
  );

  const COLUMNS = [
    {
      label: "ID de usuário",
      renderCell: (item: Node) => item.userId,
      sort: { sortKey: "USER_ID" },
    },
    {
      label: "Depósitos",
      renderCell: (item: Node) => (
        <Text fontWeight={item.isTotal ? "bold" : "normal"}>
          {item.depositos}
        </Text>
      ),
      sort: { sortKey: "DEPOSITOS" },
    },
    {
      label: "Contagem de Depósitos",
      renderCell: (item: Node) => item.depositosCount.toLocaleString(),
    },
    {
      label: "Retiradas",
      renderCell: (item: Node) => (
        <Text fontWeight={item.isTotal ? "bold" : "normal"}>
          {item.retiradas}
        </Text>
      ),
    },
    {
      label: "Depósitos líquidos",
      renderCell: (item: Node) => (
        <Text fontWeight={item.isTotal ? "bold" : "normal"}>
          {item.depositosLiquidos}
        </Text>
      ),
    },
    {
      label: "Comissões",
      renderCell: (item: Node) => (
        <Text fontWeight={item.isTotal ? "bold" : "normal"}>
          {item.comissoes}
        </Text>
      ),
    },
    {
      label: "Comissões - Contagem",
      renderCell: (item: Node) => item.comissoesCount,
    },
    {
      label: "NOR",
      renderCell: (item: Node) => (
        <Text fontWeight={item.isTotal ? "bold" : "normal"}>{item.nor}</Text>
      ),
    },
  ];

  return (
    <Box>
      <CompactTable
        columns={COLUMNS}
        data={{ ...filteredData, sort }}
        theme={theme}
      />

      <Box mt={4}>
        <Text>Itens por página: 5</Text>
        <Text>1 - 5 de 14.385 itens</Text>
      </Box>
    </Box>
  );
};

export default TableReportActivities;
