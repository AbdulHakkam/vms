import {
  Button,
  Divider,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { useState,useContext } from "react";
import axios from "axios";
import { uiContext } from "../../../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "white",
  boxShadow: 50,
  p: 4,
};
const buttonStyle = {
  bgcolor: "#fd7e14",
  ml: 5,
  mt: 7,
  right: 0,
  color: "black",
  borderRadius: 1,
  width: 200,
  boxShadow: 1,
  textTransform: "none",
  position: "relative",
};
const fieldStyle = {
  mr: 0,
  mb: 1,
  "& .MuiInputBase-root": {
    fontSize: "13px",
    height: "30px",
    width: 290,
  },
};
const fontStyle = {
  mt: 2,
  fontSize: "15px",
};

const UploadReport = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const assetInfo = props.title.split("-");
  const [formData, setFormData] = useState({
    assetTitle: assetInfo[0],
    assetVersion: assetInfo[1],
    description: props.description,
    team: "",
    scanReport: {},
    scanType: "",
    reportReference: "",
  });
  const handleLoading = useContext(uiContext);
  const onChange=(event)=> {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  const onReaderLoad=(event)=> {
    const jsonData = JSON.parse(event.target.result);
    setFormData({ ...formData, scanReport: jsonData });
  }
  const handleTeam = (event) => {
    setFormData({ ...formData, team: event.target.value });
  };
  const handleReference = (event)=>{
    setFormData({...formData,reportReference:event.target.value});
  }
  const submitItem = () => {
    const params = new URLSearchParams({
      assetName: formData.assetTitle,
      assetVersion: formData.assetVersion,
      description: formData.description,
      reportReference:formData.reportReference,
      team:formData.team,
      scannerType: "trivy",
    });
    handleLoading(true);
    handleClose();
    axios
      .post(`http://localhost:9001/parse?${params}`, formData.scanReport)
      .then(() => {
        props.handleRefresh(true);
        
      }).catch((e)=>{
        handleLoading(false);
        console.log(e);
      });
  };

  return (
    <Box sx={{ position: "absolute", right: 90 }}>
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
          <TextField variant="outlined" size="small" sx={fieldStyle} onChange={handleTeam}/>
          <Typography sx={fontStyle}>Report Reference</Typography>
          <TextField variant="outlined" size="small" sx={fieldStyle} onChange={handleReference}/>
          <Typography sx={fontStyle}>Upload Report : </Typography>
          <Input
            type={"file"}
            inputProps={{ accept: ".json, .xml" }}
            onChange={onChange}
            sx={{"& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
              fontSize: "13px",
              width:"290px",
              mb:1
            },}}
          ></Input>
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
          <Button sx={buttonStyle} onClick={submitItem}>
            Upload
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
export default UploadReport;
