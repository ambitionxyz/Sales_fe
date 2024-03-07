import { MantineProvider, createTheme } from "@mantine/core";

const MatineProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default MatineProvider;
