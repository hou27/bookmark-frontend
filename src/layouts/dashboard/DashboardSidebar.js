import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Drawer,
  Typography,
  Avatar /*Button, Stack*/,
} from "@mui/material";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";
//
import sidebarConfig from "./SidebarConfig";
import account from "../../_mocks_/account";

// ----------------------------------------------------------------------
import { instance } from "../../lib/interceptors";
import { LOGGEDIN } from "../../localKey";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    async function fetchAccountInfo() {
      try {
        await instance
          .get("api/users/me")
          .then(function (res) {
            console.log(res.data);
            res.status === 200 ? setLoggedIn(true) : setLoggedIn(false);
            setAccountInfo(res.data);
            // localStorage.setItem(LOGGEDIN, loggedIn ? "true" : "false");
          })
          .catch(function (error) {
            console.log("err : ", error);
          });
      } catch (error) {
        setLoggedIn(false);
        console.log(error);
      }
    }
    console.log("running 1");
    fetchAccountInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, setAccountInfo]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: "inline-flex" }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {loggedIn
                  ? accountInfo?.name
                    ? accountInfo.name
                    : "Loading..."
                  : "Guest"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection
        navConfig={
          loggedIn ? sidebarConfig.slice(0, 1) : sidebarConfig.slice(-2)
        }
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
