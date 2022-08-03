import React from "react";
import PropTypes from "prop-types";
// material
import { Grid } from "@mui/material";
import ContentCard from "./ContentCard";

// ----------------------------------------------------------------------

ContentList.propTypes = {
  contents: PropTypes.array.isRequired,
};

export default function ContentList({ contents, ...other }) {
  return (
    <>
      {contents && contents.length > 0 ? (
        <Grid container spacing={3} {...other}>
          {contents.map((content, idx) => (
            <Grid key={content.id} item xs={12} sm={6} md={3}>
              <ContentCard content={content} index={idx} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3} marginLeft={3}>
          No Items
        </Grid>
      )}
    </>
  );
}
