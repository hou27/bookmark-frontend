import React from "react";
// material
import { Box, Grid, Container, Typography, Stack, Paper } from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "../components/_dashboard/app";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------
import { Icon } from "@iconify/react";
import starOutline from "@iconify/icons-eva/star-outline";

const DashBoardContentImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Main">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3} marginLeft={1}>
          <Stack spacing={3}>
            <Typography variant="h4">TEST</Typography>
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
                  <Img
                    alt="complex"
                    src="/static/mock-images/covers/cover_16.jpg"
                  />
                </Box>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid xs marginX={2} marginY={1}>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
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
          </Stack>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>1</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>2</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>3</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>4</Item>
          </Grid>
        </Grid>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid> */}
      </Container>
    </Page>
  );
}
