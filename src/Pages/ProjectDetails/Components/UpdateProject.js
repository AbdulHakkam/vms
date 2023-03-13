import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { Divider, TextField } from "@mui/material";
import { useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const buttonStyle = {
  bgcolor: "#fd7e14",
  ml: 6,
  mt: 4,
  color: "black",
  borderRadius: 1,
  width: 200,
  boxShadow: 1,
  textTransform: "none",
};
const fieldStyle = {
  mr: 0,
  mb: 2,
  "& .MuiInputBase-root": {
    fontSize: "13px",
    height: "30px",
    width: 290,
  },
};
const fontStyle = {
  fontSize: "13px",
};

const UpdateProject = (props) => {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setReportDetails({
      assetTitle: assetInfo[0],
      assetVersion: assetInfo[1],
      description: props.description,
    });
    setOpen(false);
  };
  const assetInfo = props.title.split("-");
  const [reportDetails, setReportDetails] = useState({
  });
  useEffect(()=>{
    setReportDetails({
      assetTitle: assetInfo[0],
      assetVersion: assetInfo[1],
      description: props.description,
    });
  },[props.description])
  const handleTitle = (event) => {
    setReportDetails({ ...reportDetails, assetTitle: event.target.value });
  };
  const handleVersion = (event) => {
    setReportDetails({ ...reportDetails, assetVersion: event.target.value });
  };
  const handleDescription = (event) => {
    setReportDetails({ ...reportDetails, description: event.target.value });
  };
  const update = ()=>{
    if(reportDetails.assetTitle!==assetInfo[0]){
      props.handleUpdate(reportDetails.assetTitle,"asset");
    }
    if(reportDetails.assetVersion!==assetInfo[1]){
      props.handleUpdate(reportDetails.assetVersion,"asset_version");
    }
    if(reportDetails.description!==props.description){
      props.handleUpdate(reportDetails.description,"asset_description");
    }
    handleClose();
  }

  return (
    <Box>
      <Edit onClick={handleOpen} sx={{ mt: 1.5, ml: 1 }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Update Report</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography sx={fontStyle}>Asset Title :</Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={fieldStyle}
            value={reportDetails.assetTitle}
            //onChange={handleTitle}
          ></TextField>
          <Typography sx={fontStyle}>Asset Version : </Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={fieldStyle}
            value={reportDetails.assetVersion}
            //onChange={handleVersion}
          />
          <Typography sx={fontStyle}>Description : </Typography>
          <TextField
            id="outlined-multiline-static"
            variant="outlined"
            size="small"
            multiline
            maxRows={5}
            value={reportDetails.description}
            onChange={handleDescription}
            sx={{
              ...fieldStyle,
              "& .MuiInputBase-root": {
                fontSize: "13px",
                width: 290,
              },
            }}
          />
          <Button sx={buttonStyle} onClick={update}>Update</Button>
        </Box>
      </Modal>
    </Box>
  );
};
export default UpdateProject;
