import { Icon } from "@iconify/react";
import googleFill from "@iconify/icons-eva/google-fill";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
// material
import { Stack, Button, Divider, Typography, Box } from "@mui/material";
import React from "react";
import { instance } from "../../lib/interceptors";

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const baseURL = instance.defaults.baseURL;
  const kakaoAuth = `${baseURL}/api/oauth/kakao-auth`;
  const googleAuth = `${baseURL}/api/oauth/google-auth`;
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          // onClick={() => {
          //   kakaoAuthorize();
          // }}
          href={kakaoAuth}
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Box
            component="img"
            src="/static/asset/kakao_login_medium_narrow.png"
            sx={{ height: 24 }}
          />
        </Button>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        <Button
          // onClick={() => {
          //   googleAuthorize();
          // }}
          href={googleAuth}
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Icon icon={googleFill} color="#1C9CEA" height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
