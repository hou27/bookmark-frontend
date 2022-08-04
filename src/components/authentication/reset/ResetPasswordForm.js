import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { instance } from "../../../lib/interceptors";

// ----------------------------------------------------------------------

export default function ResetPasswordForm({ code }) {
  const [showPassword, setShowPassword] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Please type your password one more time.")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      const { password } = values;
      await instance
        .post("/api/users/reset-password", {
          password,
          code,
        })
        .then(function (res) {
          console.log(res);
          if (res.data.ok) {
            window.location.href = `${window.location.origin}/dashboard`;
          }
        })
        .catch(function (error) {
          console.log("err : ", error);
        });
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
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="ConfirmPassword"
            {...getFieldProps("confirmPassword")}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Reset
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
