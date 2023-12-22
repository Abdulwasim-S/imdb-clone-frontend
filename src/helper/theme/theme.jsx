import { extendTheme } from "@chakra-ui/react";

// Color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Extended theme
const theme = extendTheme({ config });

export default theme;
