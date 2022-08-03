import React, { useState, useEffect } from "react";
// material
import { Grid } from "@mui/material";
// components
import { instance } from "../../lib/interceptors";
import CategoryBox from "../../components/dashboard/CategoryBox";

// ----------------------------------------------------------------------

export default function ContentListByCategoy() {
  const [category, setcategory] = useState([]);

  useEffect(() => {
    async function fetchCategoryInfo() {
      await instance
        .get("api/users/load-categories")
        .then(function (res) {
          if (res.data.ok) {
            setcategory(res.data.categories);
            console.log(category.length);
          }
        })
        .catch(function (error) {
          console.log("err : ", error);
        });
    }
    console.log("load category info");

    fetchCategoryInfo();
  }, [setcategory]);

  return (
    <Grid container spacing={3} marginLeft={3}>
      {category.length > 0
        ? category.map((category, _) => {
            return <CategoryBox key={category.id} category={category} />;
          })
        : "No Items"}
    </Grid>
  );
}
