import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "src/service/firebase";
import { NavLink, Link } from "react-router-dom";
import AccountMenu from "src/layout/AccountMenu";
import {Icon } from '@iconify/react'
import useAuthStatus from "utils/hooks/useAuthStatus";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { switchToDark, switchToLight } from "src/redux/reducers/theme.reducer";

function CustomLink({ path, title }: { path: string; title: string }) {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            mr: 2,
            fontWeight: 600,
            color: isActive ? "text.primary" : "text.disabled",
          }}
        >
          {title}
        </Typography>
      )}
    </NavLink>
  );
}

const links = [
  { path: "/", title: "Home" },
  { path: "/teachers", title: "Teachers" },
  { path: "/about", title: "About" },
];

export default function Topbar() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | boolean>(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  let [isSignedIn] = useAuthStatus();
  const { mode } = useAppSelector((state) => state.theme);

  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        // An error occurred during logout
        console.log("Logout error:", error);
      });
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const renderLinks = links.map((link, index) => (
    <CustomLink key={index} path={link.path} title={link.title} />
  ));

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
      elevation={0}
    >
      <Toolbar disableGutters sx={{ px: { xs: 1, md: 5 } }}>
        <IconButton
          onClick={() => setOpenDrawer(true)}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <Icon icon="bx:menu" />
        </IconButton>
        <Link to="/" style={{ marginRight: 16 }}>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            LOGO
          </Typography>
        </Link>
        <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />
        <Stack
          direction="row"
          alignItems="center"
          flexGrow={1}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {renderLinks}
        </Stack>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box minWidth={200}>
            <Box
              sx={{
                p: 2,
                textAlign: "center",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" sx={{ color: "text.primary" }}>
                LOGO
              </Typography>
            </Box>
            <List>
              {links.map((item) => (
                <Link to={item.path} key={item.path} onClick={() => setOpenDrawer(false)}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          {mode === "light" ? (
            <IconButton
              onClick={() => dispatch(switchToDark())}
              sx={{ width: 40, height: 40 }}
            >
              <Icon icon="twemoji:sun" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => dispatch(switchToLight())}
              sx={{ width: 40, height: 40 }}
            >
              <Icon icon="icon-park:moon" />
            </IconButton>
          )}
          {isSignedIn && (
            <AccountMenu
              handleClose={handleClose}
              handleLogout={handleLogout}
              handleClick={handleClick}
              anchorEl={anchorEl}
              open={open}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
