import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink, useParams } from "react-router-dom";
// material
import { Container, Button, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";
//
// import HISTORYS from "../_mocks_/products";
import { instance } from "../lib/interceptors";
import ContentList from "../components/contents/ContentList";
import ContentSort from "../components/contents/ContentSort";

// ----------------------------------------------------------------------

export default function Contents() {
  const { id: categoryId } = useParams();
  const [sortBy, setSortBy] = useState("newest");
  const [contents, setContents] = useState([]);

  useEffect(() => {
    async function fetchContentsInfo() {
      await instance
        .get("api/users/load-contents", {
          params: { categoryId: categoryId },
        })
        .then(function (res) {
          if (res.data.ok) {
            setContents(res.data.contents);
          }
        })
        .catch(function (error) {
          console.log("err : ", error);
        });
    }
    console.log("load Content info");

    fetchContentsInfo();
  }, [setContents, categoryId]);

  return (
    <Page title="Dashboard: Content">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {contents && contents.length > 0
              ? contents[0].category.name
              : "Loading..."}
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
            <ContentSort sortBy={sortBy} setSortBy={setSortBy} />
          </Stack>
        </Stack>

        <ContentList contents={contents} />
      </Container>
    </Page>
  );
}
