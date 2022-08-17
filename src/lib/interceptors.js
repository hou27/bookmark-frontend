import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../localKey";

const default_access_token = localStorage.getItem(ACCESS_TOKEN);
export const instance = axios.create({
  // baseURL: "https://bookmark-test-server-hou27.herokuapp.com/",
  // baseURL: "http://13.125.189.15:4000/",
  baseURL: "http://192.168.219.100:4000/",
  headers: { Authorization: `Bearer ${default_access_token}` },
});

// instance.interceptors.request.use((config) => {
//   return config;
// });

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    // response에서 error가 발생했을 경우 catch로 넘어가기 전에 처리
    try {
      console.dir(error);
      const errResponseStatus = error.response.status;
      const errResponseData = error.response.data;
      const prevRequest = error.config;

      console.dir(error);
      // access token이 만료되어 발생하는 에러인 경우
      if (
        (errResponseData.error?.message === "jwt expired" ||
          errResponseStatus === 401) &&
        !prevRequest.retry
      ) {
        prevRequest.retry = true;
        const preRefreshToken = localStorage.getItem(REFRESH_TOKEN); // getCookie(REFRESH_TOKEN);
        if (preRefreshToken) {
          // refresh token을 이용하여 access token 재발급
          async function regenerateToken() {
            return await instance
              .post("api/auth/reissue", {
                refresh_token: preRefreshToken,
              })
              .then(async (res) => {
                if (res?.data.statusCode === 201) {
                  const { access_token, refresh_token } = res.data;
                  // 새로 받은 token들 저장
                  // setCookie(ACCESS_TOKEN, access_token, {
                  //   path: "/",
                  // });
                  // setCookie(REFRESH_TOKEN, refresh_token, {
                  //   path: "/",
                  //   secure: true,
                  //   httpOnly: true,
                  // });
                  localStorage.setItem(ACCESS_TOKEN, access_token);
                  localStorage.setItem(REFRESH_TOKEN, refresh_token);

                  // header 새로운 token으로 재설정
                  prevRequest.headers.Authorization = `Bearer ${access_token}`;

                  // 실패했던 기존 request 재시도
                  return await instance(prevRequest);
                }
              })
              .catch((e) => {
                /*
                 token 재발행 또는 기존 요청 재시도 실패 시
                 기존 token 제거
                 */
                // localStorage.removeItem(ACCESS_TOKEN);
                // localStorage.removeItem(REFRESH_TOKEN);
                // removeCookie(ACCESS_TOKEN);
                // removeCookie(REFRESH_TOKEN);
                // window.location.href = "/";

                return new Error(e);
              });
          }
          return await regenerateToken();
        } else {
          throw new Error("There is no refresh token");
        }
      }
    } catch (e) {
      // 오류 내용 출력 후 요청 거절
      return Promise.reject(e);
    }
  }
);
