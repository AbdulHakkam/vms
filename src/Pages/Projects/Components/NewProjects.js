import { Button, Divider, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius:"5px",
  bgcolor: "white",
  border: "1px solid #001",
  boxShadow: 24,
  p: 4,
};
const buttonStyle = {
  bgcolor: "#fd7e14",
  ml:10,
  mt:4,
  color: "black",
  borderRadius: 1,
  width: 200,
  boxShadow: 1,
  textTransform: "none",
};
const fieldStyle = {
  mr:0, mt:3
}

const NewProjects = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button sx={buttonStyle} onClick={handleOpen}>
        New Project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>New Project</Typography>
          <Divider/>
          <TextField label="Title" variant="outlined" size="small" sx={fieldStyle} />
          <TextField label="Confirm Title" variant="outlined" size="small" sx={fieldStyle} />
          <Button sx={buttonStyle} onClick= {handleClose}>Create</Button>
        </Box>
      </Modal>
    </div>
  );
};
export default NewProjects;