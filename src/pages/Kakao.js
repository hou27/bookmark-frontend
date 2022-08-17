import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Link, Container, Typography } from "@mui/material";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";

// ----------------------------------------------------------------------
import { instance } from "../lib/interceptors";
import qs from "qs";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../localKey";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Kakao() {
  const location = useLocation();
  useEffect(() => {
    console.log(location);

    async function kakaoLogin() {
      await instance
        .get(`api/oauth/kakao-login${location.search}`)
        .then(function (res) {
          console.log(res);
          if (res?.data.statusCode === 200) {
            const { access_token, refresh_token } = res.data;
            localStorage.setItem(ACCESS_TOKEN, access_token);
            localStorage.setItem(REFRESH_TOKEN, refresh_token);
            instance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${access_token}`;
            window.location.href = `${window.location.origin}/dashboard`;
          }
        })
        .catch(function (error) {
          console.log("err : ", error);
        });
    }

    kakaoLogin();
  }, [location]);

  return (
    <RootStyle title="Login">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/register"
        >
          Get started
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in with Kakao
            </Typography>
          </Stack>
          <div className="flex justify-center mb-6">
            <img alt="..." src="/static/asset/kakao_login_medium_narrow.png" />
          </div>
          <Typography variant="h6" gutterBottom>
            Loading...
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
