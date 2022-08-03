import React, { useState, useEffect } from "react";
// material
import { Box, Grid, Typography, Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ContentPaper from "./ContentPaper";
import { instance } from "../../lib/interceptors";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CategoryBox({ category }) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    async function fetchContentsInfo() {
      await instance
        .get("api/users/load-contents", {
          params: { categoryId: category?.id },
        })
        .then(function (res) {
          console.log(res.data);
          if (res.data.ok) {
            setContents(res.data.contents);
            console.log(contents);
          }
        })
        .catch(function (error) {
          console.log("err : ", error);
        });
    }
    console.log("load Content info");

    fetchContentsInfo();
  }, [setContents]);

  return (
    <Box component="span" marginLeft={1}>
      <Stack spacing={3}>
        <Typography variant="h4">
          {category ? category.name : "Loading"}
        </Typography>
        <Stack spacing={0}>
          {contents &&
            contents.length > 0 &&
            contents.map((content, _) => {
              return <ContentPaper key={content.id} content={content} />;
            })}
        </Stack>
      </Stack>
    </Box>
  );
}
