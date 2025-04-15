import * as React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useSort } from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
interface ComponentProps {
  search?: string; // Parâmetro opcional para o valor inicial da busca
}
const Component: React.FC<ComponentProps> = ({ search = "" }) => {
  const data = {
    nodes: [
      {
        id: "1",
        data: "04/03/2025",
        impressoes: 0,
        visitantes: "5,116",
        visitantesUnicos: "2,538",
        cadastros: 915,
        ftd: 177,
        oftd: 0,
        depositos: "R$ 138.658,12",
        ngr: "R$ 0,00",
        apostas: "R$ 0,00",
        comissoes: "R$ 0,00",
      },
      {
        id: "2",
        data: "04/01/2025",
        impressoes: 0,
        visitantes: "7,915",
        visitantesUnicos: "3,787",
        cadastros: 1301,
        ftd: 240,
        oftd: 0,
        depositos: "R$ 172.044,71",
        ngr: "R$ 22.867,51",
        apostas: "R$ 675.512,76",
        comissoes: "R$ 0,00",
      },
      {
        id: "3",
        data: "04/02/2025",
        impressoes: 0,
        visitantes: "7,288",
        visitantesUnicos: "3,589",
        cadastros: 1263,
        ftd: 261,
        oftd: 0,
        depositos: "R$ 164.511,47",
        ngr: "R$ 32.859,80",
        apostas: "R$ 1.526.391,98",
        comissoes: "R$ 0,00",
      },
      {
        id: "4",
        isTotal: true,
        data: "Total",
        impressoes: 0,
        visitantes: "20,319",
        visitantesUnicos: "9,914",
        cadastros: "3,479",
        ftd: 678,
        oftd: 0,
        depositos: "R$ 475.214,30",
        ngr: "R$ 55.827,31",
        apostas: "R$ 2.201.904,74",
        comissoes: "R$ 0,00",
      },
    ],
  };

  const parseDate = (dateString: string): Date => {
    if (dateString === "Total") return new Date(8640000000000000); // Data muito futura para o Total ficar no final

    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // Processa os dados adicionando a propriedade rawDate
  const processData = (nodes: Node[]) => {
    return nodes.map((item) => ({
      ...item,
      rawDate: parseDate(item.data),
    }));
  };

  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns: repeat(11, minmax(0, 1fr));
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

  const getFilteredData = () => {
    const processedNodes = processData(data.nodes);

    return {
      nodes: processedNodes.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      ),
    };
  };

  const filteredData = getFilteredData();
  function onSortChange() {}
  const sort = useSort(
    filteredData,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        DATA: (array) =>
          array.sort((a, b) => {
            if (a.isTotal) return 1;
            if (b.isTotal) return -1;
            return a.rawDate - b.rawDate;
          }),
      },
    }
  );

  interface Column {
    label: string;
    renderCell: (item: Node) => React.ReactNode;
    sort?: { sortKey: string };
  }

  interface Node {
    id: string;
    data: string;
    impressoes: number;
    visitantes: string;
    visitantesUnicos: string;
    cadastros: number | string;
    ftd: number;
    oftd: number;
    depositos: string;
    ngr: string;
    apostas: string;
    comissoes: string;
    isTotal?: boolean;
    rawDate?: Date;
  }

  const COLUMNS: Column[] = [
    {
      label: "Data",
      renderCell: (item: Node) => item.data,
      sort: { sortKey: "DATA" },
    },
    { label: "Impressões", renderCell: (item: Node) => item.impressoes },
    { label: "Visitantes", renderCell: (item: Node) => item.visitantes },
    {
      label: "Visitantes Únicos",
      renderCell: (item: Node) => item.visitantesUnicos,
    },
    { label: "Cadastros", renderCell: (item: Node) => item.cadastros },
    { label: "FTD", renderCell: (item: Node) => item.ftd },
    { label: "OFTD", renderCell: (item: Node) => item.oftd },
    {
      label: "Depósitos",
      renderCell: (item: Node) => (
        <span style={{ fontWeight: item.isTotal ? "bold" : "normal" }}>
          {item.depositos}
        </span>
      ),
    },
    {
      label: "NGR",
      renderCell: (item: Node) => (
        <span style={{ fontWeight: item.isTotal ? "bold" : "normal" }}>
          {item.ngr}
        </span>
      ),
    },
    {
      label: "Apostas",
      renderCell: (item: Node) => (
        <span style={{ fontWeight: item.isTotal ? "bold" : "normal" }}>
          {item.apostas}
        </span>
      ),
    },
    {
      label: "Comissões",
      renderCell: (item: Node) => (
        <span style={{ fontWeight: item.isTotal ? "bold" : "normal" }}>
          {item.comissoes}
        </span>
      ),
    },
  ];

  return (
    <>
      <CompactTable
        columns={COLUMNS}
        data={filteredData}
        theme={theme}
        sort={sort}
      />

      <br />
      <div>
        Items por página: 5
        <br />1 - {filteredData.nodes.length} de {filteredData.nodes.length}{" "}
        itens
      </div>
    </>
  );
};

export default Component;
