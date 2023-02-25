import { Button, Divider, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 50,
  p: 4,
};
const buttonStyle = {
  bgcolor: "#fd7e14",
  ml: 10,
  mt: 7,
  right:0,
  color: "black",
  borderRadius: 1,
  width: 200,
  boxShadow: 1,
  textTransform: "none",
  position: "relative",
};
const fieldStyle = {
  mr: 0,
  mt: 0,
  br:0
};
const fontStyle ={
  mt:2,
  fontSize:"15px"
}

const UploadReport = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ position: "absolute",right:90}}>
      <Button sx={buttonStyle} onClick={handleOpen}>
        Upload Report
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Upload Report</Typography>
          <Divider />
          <Typography sx={fontStyle}>Team</Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={fieldStyle}
          />
           <Typography sx={fontStyle}>Report Reference</Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={fieldStyle}
          />
          <Input type={"file"} inputProps={{ accept: ".json, .xml" }} sx={{mt:3}} onChange={(event)=>{
            console.log(event.target.files);
          }}></Input>
          <Button sx={buttonStyle} onClick={handleClose}>
            Upload
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
export default UploadReport;
