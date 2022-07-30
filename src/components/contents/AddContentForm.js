import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { instance } from "../../lib/interceptors";
import CategorySideBar from "./CategorySideBar";
import React from "react";
import axios from "axios";

// ----------------------------------------------------------------------

export default function AddContentForm() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const RegisterSchema = Yup.object().shape({
    link: Yup.string().min(2, "Too Short!").required("link required"),
    title: Yup.string(),
    description: Yup.string(),
    comment: Yup.string(),
    categoryName: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      link: "",
      title: "",
      description: "",
      comment: "",
      categoryName: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate("/dashboard/contents", { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  async function onSubmit() {
    await instance
      .post("api/contents/add", {
        link: values.link,
        title: values?.title,
        description: values?.description,
        comment: values?.comment,
        categoryName: values?.categoryName,
      })
      .then(function (res) {
        console.log(res);
        return res;
      })
      .catch(function (error) {
        console.log("err : ", error);
      });
  }

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={() => {
          handleSubmit(onSubmit());
        }}
      >
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="link"
              {...getFieldProps("link")}
              error={Boolean(touched.link && errors.link)}
              helperText={touched.link && errors.link}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete=""
            type="text"
            label="comment"
            {...getFieldProps("comment")}
            error={Boolean(touched.comment && errors.comment)}
            helperText={touched.comment && errors.comment}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              autoComplete=""
              type="text"
              label="categoryName"
              {...getFieldProps("categoryName")}
              error={Boolean(touched.categoryName && errors.categoryName)}
              helperText={touched.categoryName && errors.categoryName}
            />
            <CategorySideBar
              formik={formik}
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add Content
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
