import React from "react";
// @ts-ignore
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
// @ts-ignore
import { Box, Card, Link, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import { useLocation } from "react-router-dom";
import AddContentForm from "../components/contents/AddContentForm";

// ----------------------------------------------------------------------

// @ts-ignore
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

// @ts-ignore
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
  const { state } = useLocation();
  // @ts-ignore
  const link = state?.link ? state.link : "";
  console.log(link);
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

        <AddContentForm link={link} />
      </ContentStyle>
    </Container>
  );
}
