import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AppBar, Badge, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchBar from "./SearchBar.jsx";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import { DRAWER_WIDTH } from "../constants";

const NAV = [
  { to: "/", label: "Home", icon: <HomeIcon />, end: true },
  { to: "/movies", label: "Movies", icon: <MovieIcon /> },
  { to: "/tv", label: "TV Shows", icon: <LiveTvIcon /> },
  { to: "/watchlist", label: "My Watchlist", icon: <BookmarksIcon /> },
];

function Logo() {
  return (
    <Typography
      component={NavLink}
      to="/"
      variant="h5"
      aria-label="Reelhouse home"
      sx={{ color: "text.primary", textDecoration: "none" }}
    >
      Reel
      <Box component="span" sx={{ ml: 0.4, px: 0.7, borderRadius: 1, bgcolor: "primary.main", color: "primary.contrastText" }}>
        house
      </Box>
    </Typography>
  );
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useWatchlist();

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ px: 2.5 }}>
        <Logo />
      </Toolbar>
      <List component="nav" aria-label="Main navigation" sx={{ px: 1.5 }}>
        {NAV.map(({ to, label, icon, end }) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.active": {
                bgcolor: "action.selected",
                color: "primary.main",
                "& .MuiListItemIcon-root": { color: "primary.main" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {to === "/watchlist" ? (
                <Badge badgeContent={items.length} color="primary" max={99}>
                  {icon}
                </Badge>
              ) : (
                icon
              )}
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Typography variant="caption" color="text.secondary" sx={{ p: 2.5 }}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: "rgba(21,13,38,.92)",
          backdropFilter: "blur(10px)",
          borderBottom: 1,
          borderColor: "divider",
          backgroundImage: "none",
        }}
      >
        <Toolbar sx={{ gap: 1.5 }}>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
            <Logo />
          </Box>
          <SearchBar />
        </Toolbar>
      </AppBar>

      <Box component="nav" aria-label="Sidebar" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: DRAWER_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: DRAWER_WIDTH, borderRight: 1, borderColor: "divider" } }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, minHeight: "100vh", overflowX: "hidden" }}>
        <Toolbar />
        <Outlet />
        <Box sx={{ height: 4 }} />
      </Box>
    </Box>
  );
}
