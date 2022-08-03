import React from "react";
// material
import { Box, Grid, Typography, Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import starOutline from "@iconify/icons-eva/star-outline";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ContentPaper({ content }) {
  console.log(content);
  return (
    <>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          width: 300,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Box sx={{ width: 100, height: 64 }}>
            <Img alt="complex" src="/static/mock-images/covers/cover_16.jpg" />
          </Box>
          <Grid item xs container direction="column" spacing={2}>
            <Grid xs marginX={2} marginY={1}>
              <Typography gutterBottom variant="subtitle1" component="div">
                Title
              </Typography>

              <Typography variant="body2" gutterBottom>
                comment
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <Box
              component={Icon}
              icon={starOutline}
              sx={{ width: 16, height: 16, mr: 0.5 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
