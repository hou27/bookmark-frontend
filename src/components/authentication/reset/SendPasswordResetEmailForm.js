import React from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

// material
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { instance } from "../../../lib/interceptors";

// ----------------------------------------------------------------------

export default function SendPasswordResetEmailForm() {
  const SendPasswordResetEmailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SendPasswordResetEmailSchema,
    onSubmit: async (values) => {
      const { email } = values;
      const encodedEmail = encodeURI(email);
      await instance
        .get(`/api/auth/send-password-reset-email/${encodedEmail}`)
        .then(function (res) {
          console.log(res);
          if (res.data.statusCode === 200) {
            window.location.href = `${window.location.origin}/dashboard`;
          }
        })
        .catch(function (error) {
          console.log("err : ", error);
        });
      // navigate("/dashboard", { replace: true });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="text"
            label="Email"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Send Password Reset Email
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
