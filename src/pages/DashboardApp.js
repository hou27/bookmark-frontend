import React, { useState, useEffect } from "react";
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
import { instance } from "../lib/interceptors";
import CategoryBox from "../components/dashboard/CategoryBox";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [category, setcategory] = useState([]);

  useEffect(() => {
    async function fetchCategoryInfo() {
      await instance
        .get("api/users/load-categories")
        .then(function (res) {
          console.log(res.data);
          if (res.data.ok) {
            setcategory(res.data.categories);
            console.log(category.length);
          }
        })
        .catch(function (error) {
          console.log("err : ", error);
        });
    }
    console.log("load category info");

    fetchCategoryInfo();
  }, [setcategory]);

  return (
    <Page title="Dashboard | Main">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3} marginLeft={1}>
          {category.length > 0
            ? category.map((category, _) => {
                return <CategoryBox category={category} />;
              })
            : "No Items"}
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
