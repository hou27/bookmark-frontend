import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { Container, Button, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  ProductSort,
  ProductCartWidget,
} from "../components/_dashboard/products";
//
// import HISTORYS from "../_mocks_/products";
import { instance } from "../lib/interceptors";
import ContentList from "../components/contents/ContentList";

// ----------------------------------------------------------------------

export default function Contents() {
  const [openFilter, setOpenFilter] = useState(false);
  const [list, setList] = React.useState([]);

  useEffect(() => {
    async function getMyList() {
      await instance
        .get("/api/users/load-contents")
        .then((res) => {
          console.log(res.data);
          setList(res.data.contents);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getMyList();
  }, []);

  const formik = useFormik({
    initialValues: {
      gender: "",
      category: "",
      colors: "",
      priceRange: "",
      rating: "",
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Dashboard: History">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Content List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/add`}
            startIcon={<Icon icon={plusFill} />}
          >
            콘텐츠 추가
          </Button>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductSort />
          </Stack>
        </Stack>

        <ContentList contents={list} />
      </Container>
    </Page>
  );
}
