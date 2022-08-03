import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { Container, Button, Stack, Typography, Alert } from "@mui/material";
// components
import Page from "../components/Page";
//
// import HISTORYS from "../_mocks_/products";
import { instance } from "../lib/interceptors";
import ContentList from "../components/contents/ContentList";
import ContentSort from "../components/contents/ContentSort";
import ContentListByCategoy from "../components/dashboard/ContentListByCategoy";

// ----------------------------------------------------------------------

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function getMyList() {
      await instance
        .get("/api/users/load-contents")
        .then((res) => {
          console.log(res.data);
          if (res.data.ok) {
            const sortedList = res.data.contents.sort((a, b) =>
              a.updatedAt > b.updatedAt ? -1 : 1
            );
            setList(sortedList);
          } else {
            setList(["non-login"]);
            console.log(list);
          }
        })
        .catch((err) => {
          setList(["non-login"]);
          console.log(err);
        });
    }
    getMyList();
  }, []);

  return (
    <Page title="Dashboard">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Know Zip
          </Typography>
          {list[0] === "non-login" ? null : (
            <Button
              variant="contained"
              component={RouterLink}
              to={`/dashboard/add`}
              startIcon={<Icon icon={plusFill} />}
            >
              콘텐츠 추가
            </Button>
          )}
        </Stack>

        {list[0] === "non-login" ? (
          <Alert severity="info">Please Log In</Alert>
        ) : (
          <>
            <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mb: 5 }}
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ContentSort sortBy={sortBy} setSortBy={setSortBy} />
              </Stack>
            </Stack>

            {sortBy === "newest" ? (
              <ContentList contents={list} />
            ) : (
              <ContentListByCategoy />
            )}
          </>
        )}
      </Container>
    </Page>
  );
}
