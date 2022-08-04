import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton, Alert } from "@mui/material";
// components
import { MHidden } from "../../components/@material-extend";
//
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./NotificationsPopover";
import { instance } from "../../lib/interceptors";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    async function fetchAccountInfo() {
      try {
        await instance
          .get("api/users/me")
          .then(function (res) {
            console.log(res.data);
            res.status === 200 ? setLoggedIn(true) : setLoggedIn(false);
            setAccountInfo(res.data);
          })
          .catch(function (error) {
            console.log("err : ", error);
          });
      } catch (error) {
        setLoggedIn(false);
        console.log(error);
      }
    }
    console.log("running 2");
    fetchAccountInfo();
  }, [setAccountInfo]);

  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {accountInfo && !accountInfo?.verified ? (
            <Alert severity="info">"Should verify your EMAIL"</Alert>
          ) : null}
          <>
            {loggedIn ? <NotificationsPopover /> : null}
            <AccountPopover
              loggedIn={loggedIn}
              accountInfo={
                loggedIn
                  ? accountInfo
                  : { name: "Guest", email: "Should Log In" }
              }
            />
          </>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
