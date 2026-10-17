import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import { DetailsProvider } from "./context/DetailsContext.jsx";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import BrowsePage from "./pages/BrowsePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <WatchlistProvider>
          <DetailsProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="movies" element={<BrowsePage key="movie" type="movie" title="Movies" />} />
                <Route path="tv" element={<BrowsePage key="tv" type="tv" title="TV Shows" />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="watchlist" element={<WatchlistPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </DetailsProvider>
        </WatchlistProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
