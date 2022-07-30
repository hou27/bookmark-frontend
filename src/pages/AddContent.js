import React from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import AddContentForm from "../components/contents/AddContentForm";

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

export default function AddContent() {
  return (
    <Container>
      <ContentStyle>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Add your Content
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Free forever. No credit card needed.
          </Typography>
        </Box>

        <AddContentForm />
      </ContentStyle>
    </Container>
  );
}
