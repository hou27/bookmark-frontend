import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import starOutline from "@iconify/icons-eva/star-outline";
// material
import {
  Box,
  Card,
  Typography,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
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
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";

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
    await instance
      .delete(`api/contents/delete/${id}`)
      .then(function (res) {
        console.log(res);
        window.location.href = window.location.href;
      })
      .catch(function (error) {
        console.log("err : ", error);
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

  /**
   * 콘텐츠 수정
   */
  const UpdateContentSchema = Yup.object().shape({
    title: Yup.string(),
    comment: Yup.string(),
    categoryName: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title,
      comment,
      categoryName,
    },
    validationSchema: UpdateContentSchema,
    onSubmit: async (values) => {
      const { title, comment, categoryName } = values;
      console.log(values);
      await instance
        .post("api/contents/update", {
          link,
          title,
          comment,
          categoryName,
        })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log("err : ", error);
        });
      // navigate("/dashboard", { replace: true });
      window.location.href = window.location.href;
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card>
      <Box
        onClick={() => window.open(link, "_blank")}
        sx={{ pt: "100%", position: "relative" }}
      >
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
          <Typography variant="subtitle2" noWrap>
            {title ? title : "Untitled"}
          </Typography>
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
            {/* Update Content Form Start*/}
            <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div>
                  <Dialog
                    disableEscapeKeyDown
                    open={openPopUp}
                    onClose={handleClosePopUp}
                  >
                    <DialogTitle>Update your content Info.</DialogTitle>

                    <DialogContent>
                      <Box
                        component="form"
                        sx={{ display: "flex", flexWrap: "wrap" }}
                      >
                        <Stack spacing={3}>
                          <TextField
                            fullWidth
                            type="text"
                            label="title"
                            {...getFieldProps("title")}
                            error={Boolean(touched.title && errors.title)}
                            // helperText={touched.title && errors.title}
                          />

                          <TextField
                            fullWidth
                            type="text"
                            label="comment"
                            {...getFieldProps("comment")}
                            error={Boolean(touched.comment && errors.comment)}
                            // helperText={touched.comment && errors.comment}
                          />

                          <TextField
                            fullWidth
                            type="text"
                            label="categoryName"
                            {...getFieldProps("categoryName")}
                            error={Boolean(
                              touched.categoryName && errors.categoryName
                            )}
                            helperText={
                              touched.categoryName && errors.categoryName
                            }
                          />
                          <DialogActions>
                            <Button type="button" onClick={handleClosePopUp}>
                              Cancel
                            </Button>
                            <LoadingButton type="submit" loading={isSubmitting}>
                              Save
                            </LoadingButton>
                          </DialogActions>
                        </Stack>
                      </Box>
                    </DialogContent>
                  </Dialog>
                </div>
              </Form>
            </FormikProvider>
            {/* Update Content Form End */}
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
