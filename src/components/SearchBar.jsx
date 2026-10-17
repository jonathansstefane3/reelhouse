import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Search field in the top bar. It waits 400 ms after typing stops,
// then opens /search?q=... which fetches the results from the API.
export default function SearchBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const [value, setValue] = useState(params.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const q = value.trim();
      if (q) navigate(`/search?q=${encodeURIComponent(q)}`, { replace: pathname === "/search" });
      else if (pathname === "/search") navigate("/", { replace: true });
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Clear the box when the user leaves the search page.
  useEffect(() => {
    if (pathname !== "/search") setValue("");
  }, [pathname]);

  return (
    <TextField
      type="search"
      size="small"
      placeholder="Search movies and TV shows"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && value.trim()) navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      }}
      slotProps={{
        htmlInput: { "aria-label": "Search movies and TV shows" },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          sx: { borderRadius: 999, bgcolor: "background.paper" },
        },
      }}
      sx={{ flexGrow: 1, maxWidth: 420, ml: { sm: "auto" } }}
    />
  );
}
