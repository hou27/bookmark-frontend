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
  return (
    <>
      <Paper
        sx={{
          p: 1,
          margin: "auto",
          width: 300,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Box sx={{ width: 100, height: 64 }}>
            <Img
              alt="complex"
              src={
                content?.coverImg
                  ? content.coverImg
                  : "/static/mock-images/covers/cover_16.jpg"
              }
            />
          </Box>
          <Grid
            direction="column"
            spacing={2}
            marginX={1}
            marginY={1}
            width={160}
          >
            <Typography
              gutterBottom
              variant="subtitle1"
              component="h3"
              noWrap={true}
              maxWidth={150}
              sx={{ cursor: "pointer" }}
              onClick={() => window.open(content.link, "_blank")}
            >
              {content.title}
            </Typography>

            <Typography
              variant="body2"
              gutterBottom
              noWrap={true}
              maxWidth={150}
            >
              {content.comment}
            </Typography>
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
