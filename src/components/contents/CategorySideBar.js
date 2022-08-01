import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Form, FormikProvider } from "formik";
import closeFill from "@iconify/icons-eva/close-fill";
import roundClearAll from "@iconify/icons-ic/round-clear-all";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
//
import Scrollbar from "../Scrollbar";
import ColorManyPicker from "../ColorManyPicker";

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];
export const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];
export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];
export const FILTER_RATING_OPTIONS = [
  "up4Star",
  "up3Star",
  "up2Star",
  "up1Star",
];
export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];
export const FILTER_COLOR_OPTIONS = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

// ----------------------------------------------------------------------

CategorySideBar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  setCategory: PropTypes.func,
  formik: PropTypes.object,
};

export default function CategorySideBar({
  isOpenFilter,
  onOpenFilter,
  onCloseFilter,
  setCategory,
  formik,
}) {
  const setCategoryValue = (value) => {
    setCategory(value);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Categories&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Drawer
          anchor="right"
          open={isOpenFilter}
          onClose={onCloseFilter}
          PaperProps={{
            sx: { width: 280, border: "none", overflow: "hidden" },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 1, py: 2 }}
          >
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Categories
            </Typography>
            <IconButton onClick={onCloseFilter}>
              <Icon icon={closeFill} width={20} height={20} />
            </IconButton>
          </Stack>

          <Divider />

          <Scrollbar>
            <Stack spacing={3} sx={{ p: 3 }}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Category
                </Typography>
                <RadioGroup

                // {...getFieldProps("category")}
                >
                  {FILTER_CATEGORY_OPTIONS.map((item) => (
                    <FormControlLabel
                      onChange={(e) => {
                        setCategoryValue(e.target?.value);
                      }}
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Or Add new Category!
                </Typography>
              </div>
            </Stack>
          </Scrollbar>
        </Drawer>
      </FormikProvider>
    </>
  );
}
