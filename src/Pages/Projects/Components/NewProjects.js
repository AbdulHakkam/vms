import {
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState,useContext } from "react";
import { uiContext } from "../../../App";
import axios from "axios";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};
const buttonStyle = {
  bgcolor: "#fd7e14",
  ml: 10,
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
const NewProjects = (props) => {
  const handleLoading  = useContext(uiContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    assetTitle: "",
    assetVersion: "",
    description: "",
    team: "",
    scanReport: {},
    scanType: "",
    reportReference:""
  });
  const handleTitle = (event) => {

    setFormData({ ...formData, assetTitle: event.target.value });
  };
  const handleVersion = (event) => {
    setFormData({ ...formData, assetVersion: event.target.value });
  };
  const handleDescription = (event) => {
    setFormData({ ...formData, description: event.target.value });
  };
  const handleTeam = (event) => {
    setFormData({ ...formData, team: event.target.value });
  };
  const handleReference = (event)=>{
    setFormData({...formData,reportReference:event.target.value});
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event) {
    const jsonData = JSON.parse(event.target.result);
    setFormData({ ...formData, scanReport: jsonData });
  }
  const params = new URLSearchParams({
    assetName: formData.assetTitle,
    assetVersion: formData.assetVersion,
    description: formData.description,
    reportReference:formData.reportReference,
    team:formData.team,
    scannerType: "trivy",
  });
  const submitItem = () => {
    handleLoading(true);
    handleClose();
    axios
      .post(`http://localhost:9001/parse?${params}`, formData.scanReport)
      .then(() => {
        handleClose();
        props.handleRefresh(true);
      });
  };

  return (
    <Box>
      <Button sx={buttonStyle} onClick={handleOpen}>
        New Asset
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ ml: 12 }}>New Project</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography sx={fontStyle}>Asset Title :</Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={fieldStyle}
            onChange={handleTitle}
          />
          <Typography sx={fontStyle}>Asset Version : </Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={fieldStyle}
            onChange={handleVersion}
          />
          <Typography sx={fontStyle}>Team : </Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={fieldStyle}
            onChange={handleTeam}
          />
          <Typography sx={fontStyle}>Description : </Typography>
          <TextField
            onChange={handleDescription}
            variant="outlined"
            size="small"
            multiline
            maxRows={2}
            sx={{
              ...fieldStyle,
              "& .MuiInputBase-root": {
                height: "50px",
                fontSize: "13px",
                width: 290,
              },
            }}
          />
          <Typography sx={fontStyle}>Upload Report : </Typography>
          <Input
            type={"file"}
            inputProps={{ accept: ".json, .xml" }}
            onChange={onChange}
            sx={{mb:2,"& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
              fontSize: "13px",
              width:"290px",
              mb:1
            },}}
          ></Input>
          <Typography sx={fontStyle}>Report Reference : </Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={fieldStyle}
            onChange={handleReference}
          />
          <Typography sx={fontStyle}>Report Type : </Typography>
          <Select
            sx={{ width: "100px", height: "33px", fontSize: 12, mt: 1 }}
            value={"name"}
          >
            <MenuItem sx={{ fontSize: 12 }} value={"name"}>
              Trivy
            </MenuItem>
            <MenuItem sx={{ fontSize: 12 }}>NetSparker</MenuItem>
          </Select>
          <Button sx={{ ...buttonStyle, ml: 6 }} onClick={submitItem}>
            Create
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
export default NewProjects;
