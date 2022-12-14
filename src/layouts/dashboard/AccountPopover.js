import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
//
import account from "../../_mocks_/account";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../localKey";
import { instance } from "../../lib/interceptors";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";

// ----------------------------------------------------------------------

export default function AccountPopover({ loggedIn, accountInfo }) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function logout() {
    await instance
      .post("api/auth/logout", {
        refresh_token: localStorage.getItem(REFRESH_TOKEN),
      })
      .then(function (res) {
        console.log(res?.data);
        if (res.data.statusCode === 201) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log("err : ", error);
      });
  }

  console.log(loggedIn);
  const MENU_OPTIONS = loggedIn
    ? [
        {
          label: "Home",
          icon: homeFill,
          linkTo: "/",
        },
        {
          label: "Profile",
          icon: personFill,
          linkTo: "#",
        },
        {
          label: "Settings",
          icon: settings2Fill,
          linkTo: "#",
        },
      ]
    : [
        {
          label: "login",
          linkTo: "/login",
          icon: lockFill,
        },
        {
          label: "register",
          linkTo: "/register",
          icon: personAddFill,
        },
      ];

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {accountInfo?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {accountInfo?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        {loggedIn ? (
          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button
              fullWidth
              onClick={logout}
              color="inherit"
              variant="outlined"
            >
              Logout
            </Button>
          </Box>
        ) : null}
      </MenuPopover>
    </>
  );
}
