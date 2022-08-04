import React from "react";
// material
import { styled } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
// components
import { useLocation } from "react-router-dom";
import AddContentForm from "../components/contents/AddContentForm";

// ----------------------------------------------------------------------

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
