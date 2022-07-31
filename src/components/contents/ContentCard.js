import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import starOutline from "@iconify/icons-eva/star-outline";
// material
import { Box, Card, Link, Typography, Stack, Popover } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
// utils
// import { /*fCurrency,*/ fNumber } from "../../../utils/formatNumber";
//
// import ColorPreview from '../../ColorPreview';
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
// import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Label from "../Label";
import { instance } from "../../lib/interceptors";

// ----------------------------------------------------------------------
const HistoryDiv = styled("div")({
  display: "flex",
});

const MenuIcon = styled(Icon)({
  position: "absolute",
  right: "5%",
});

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

// ----------------------------------------------------------------------

ContentCard.propTypes = {
  product: PropTypes.object,
};

export default function ContentCard({ content, index }) {
  const { id, link, title, coverImg, comment, category } = content;
  let categoryName = "미분류";
  if (category?.name) {
    categoryName = category.name;
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElPopUp, setAnchorElPopUp] = React.useState(null);

  async function deleteContent() {
    return await instance
      .delete(`api/contents/delete/${id}`)
      .then(function (res) {
        console.log(res);
        return true;
      })
      .catch(function (error) {
        console.log("err : ", error);
        return false;
      });
  }
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickPopUp = (event) => {
    setAnchorElPopUp(event.currentTarget);
  };
  const handleClosePopUp = () => {
    setAnchorElPopUp(null);
  };

  const openPopUp = Boolean(anchorElPopUp);
  const popoUpId = open ? "simple-popover" : undefined;

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <Label
          variant="filled"
          color={"info"}
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: "absolute",
            textTransform: "uppercase",
          }}
        >
          {categoryName}
        </Label>
        <ProductImgStyle alt={title} src={coverImg} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <HistoryDiv>
          {/* <Link
            to={{ pathname: link }}
            color="inherit"
            underline="hover"
            target="_blank"
            component={null}
          > */}
          <Typography variant="subtitle2" noWrap>
            {title ? title : "Untitled"}
          </Typography>
          {/* </Link> */}
          <div>
            <MenuIcon
              icon="carbon:overflow-menu-vertical"
              onClick={handleClick}
            />
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={(event) => {
                  handleClose();
                  handleClickPopUp(event);
                }}
                disableRipple
              >
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  deleteContent();
                }}
                disableRipple
              >
                <DeleteIcon />
                Delete
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleClose} disableRipple>
                <ArchiveIcon />
                Archive
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <MoreHorizIcon />
                More
              </MenuItem>
            </StyledMenu>
            <Popover
              id={popoUpId}
              open={openPopUp}
              anchorEl={anchorElPopUp}
              onClose={handleClosePopUp}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
          </div>
        </HistoryDiv>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {comment ? comment : "No comment"}
          </Typography>
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              ml: index === 0 ? 0 : 1.5,
            }}
          >
            <Box
              component={Icon}
              icon={starOutline}
              sx={{ width: 16, height: 16, mr: 0.5 }}
            />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
