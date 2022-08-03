import React, { useState, useEffect } from "react";
// ----------------------------------------------------------------------
import { useNavigate } from "react-router-dom";
// material
import { Box, Typography, Stack } from "@mui/material";
import ContentPaper from "./ContentPaper";
import { instance } from "../../lib/interceptors";

export default function CategoryBox({ category }) {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);

  const handleClickCategory = () => {
    navigate(`/dashboard/contents/${category.id}`);
  };

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
        <Typography
          onClick={() => {
            handleClickCategory();
          }}
          sx={{ cursor: "pointer" }}
          variant="h4"
        >
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
