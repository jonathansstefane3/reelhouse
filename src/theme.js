import { createTheme } from "@mui/material/styles";

const heading = {
  fontFamily: '"Bricolage Grotesque", "DM Sans", system-ui, sans-serif',
  fontWeight: 800,
  letterSpacing: "-0.02em",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ffb627", contrastText: "#2b1a00" },
    background: { default: "#150d26", paper: "#221538" },
    text: { primary: "#f3eef8", secondary: "#a99bc0" },
    divider: "rgba(255,255,255,0.09)",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    h1: heading, h2: heading, h3: heading, h4: heading, h5: heading, h6: heading,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { overflowX: "hidden" },
        "*::-webkit-scrollbar": { height: 8, width: 8 },
        "*::-webkit-scrollbar-thumb": { background: "#4a3378", borderRadius: 8 },
      },
    },
    MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 700 } } },
  },
});

export default theme;
