import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import "./global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
  
  </QueryClientProvider>  
    </ChakraProvider>
  </React.StrictMode>
);
