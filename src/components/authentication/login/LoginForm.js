import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { instance } from "../../../lib/interceptors";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../localKey";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  async function onSubmit() {
    console.log(values);
    await instance
      .post("api/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then(function (res) {
        console.log(res);
        const { access_token, refresh_token } = res.data;
        console.log(
          "access_token prev setItem",
          localStorage.getItem(ACCESS_TOKEN)
        );
        console.log(
          "refresh_token prev setItem",
          localStorage.getItem(REFRESH_TOKEN)
        );
        localStorage.setItem(ACCESS_TOKEN, access_token);
        localStorage.setItem(REFRESH_TOKEN, refresh_token);
        console.log(
          "access_token after setItem",
          localStorage.getItem(ACCESS_TOKEN)
        );
        console.log(
          "refresh_token after setItem",
          localStorage.getItem(REFRESH_TOKEN)
        );
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        console.log(instance.defaults.headers.common["Authorization"]);
      })
      .catch(function (error) {
        console.log("err : ", error);
      })
      .then(function () {});
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
          <TextField
            fullWidth
            autoComplete="useremail"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

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
                    onClick={() => {
                      handleShowPassword();
                    }}
                    edge="end"
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
