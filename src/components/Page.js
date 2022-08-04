import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import React, { forwardRef } from "react";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const Page = forwardRef(({ title = "", ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
  </Box>
));

Page.propTypes = {
  title: PropTypes.string,
};

export default Page;
