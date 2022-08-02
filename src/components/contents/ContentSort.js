import React from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import chevronUpFill from "@iconify/icons-eva/chevron-up-fill";
import chevronDownFill from "@iconify/icons-eva/chevron-down-fill";
// material
import { Menu, Button, MenuItem, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: "category", label: "Category" },
  { value: "newest", label: "Newest" },
];

export default function ContentSort() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          Newest
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === "newest"}
            onClick={handleClose}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
