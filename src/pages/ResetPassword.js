import * as React from "react";
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import {
  ResetPasswordForm,
  SendPasswordResetEmailForm,
} from "../components/authentication/reset";

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

export default function ResetPassword() {
  const pathname = window.location.pathname.split("/").at(-2);
  let code =
    pathname === "reset" ? window.location.pathname.split("/").at(-1) : "";
  return (
    <RootStyle title="Reset Password">
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
              Reset Your Password
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter your {pathname === "reset" ? "new password" : "email"}{" "}
              below.
            </Typography>
          </Stack>

          {pathname === "reset" ? (
            <ResetPasswordForm code={code} />
          ) : (
            <SendPasswordResetEmailForm />
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
