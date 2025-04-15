// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoints: {
    base: "0px",
    sm: "250px",
    sm1: "310px",
    sm2: "390px",
    md: "490px",
    md1: "768px",
    lg: "960px",
    xl: "1200px",
    xl2: "1536px",
  },
  colors: {
    primary: "#491474",
    brand: {
      white: "#fff",
      black: "#000",
      BGInput: "#EEEEEF",
      primary: "#491474",
      secondary: "#2a113d",
      quaternary: "#58ddb7",
      disabledBg: "#A0A0A0",
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },

  components: {
    Box: {
      variants: {
        Query500px: {
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "md",
          shadow: "md",
          maxWidth: "400px",
          width: "full",
        },
      },
    },

    Divider: {
      variants: {
        solid: {
          borderStyle: "solid",
          borderColor: "gray.400",
          borderRadius: 10,
        },
      },
    },

    Input: {
      variants: {
        filled: {
          field: {
            bg: "brand.BGInput",
            color: "black",
            padding: "1.7rem 0.5rem",
            borderRadius: "12px",
          },
        },
      },
    },

    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        button: {
          bg: "brand.primary",
          color: "brand.white",
          padding: "1rem 1.5rem",
          borderRadius: "10",
          _hover: {
            bg: "#2a113d",
            _disabled: {
              bg: "gray",
            },
          },
          _disabled: {
            bg: "brand.disabledBg", // Added disabled background color
          },
        },
        secondarybutton: {
          bg: "brand.primary",
          color: "brand.white",
          padding: "1rem 1.5rem",
          borderRadius: "10",
          _hover: {
            bg: "brand.secondary",
            _disabled: {
              bg: "gray",
            },
          },
          _disabled: {
            bg: "brand.disabledBg",
          },
        },
        outline: {
          color: "brand.primary",
          padding: "1rem 1.5rem",
          borderRadius: "8",
          border: "1px solid ",
          borderColor: "brand.primary",
          _hover: {
            bg: "brand.secondary",
            color: "brand.white",
            border: "1px solid #ffffff",
          },
          _disabled: {
            bg: "brand.disabledBg",
          },
        },
        login: {
          color: "brand.primary",
          bg: "#fff",
          padding: "1rem 1.5rem",
          borderRadius: "10",
          border: "1px solid ",
          _hover: {
            bg: "brand.BGInput",
            border: "1px solid #ffffff",
          },
          _disabled: {
            bg: "brand.disabledBg",
          },
        },
        buttonHome: {
          bg: "brand.primary",
          color: "brand.white",
          borderRadius: "8",
          _hover: {
            bg: "#3c0966",
          },
          _disabled: {
            bg: "brand.disabledBg",
          },
        },
        balanceBtn: {
          bg: "brand.white",
          color: "brand.black",
          border: "1px solid #cccccc",
          borderRadius: "50",
          _hover: {
            bg: "#3c0966",
          },
          _disabled: {
            bg: "brand.disabledBg", // Added disabled background color
          },
        },
        link: {
          color: "brand.primary",
          _hover: {
            color: "#3c0966",
            textDecoration: "none",
          },
          _disabled: {
            color: "brand.disabledBg", // Added disabled background color
          },
        },
        providesButons: {
          bg: "#ffffff",
          color: "#4E4F55",
          fontWeigth: "500",
          padding: "1.7rem 3rem",
          borderRadius: "8",
          border: "1px solid #491474",
          _hover: {
            bg: "#f3f2f2",
          },
          _disabled: {
            bg: "brand.disabledBg", // Added disabled background color
          },
        },
      },
    },
  },
});

export default theme;
