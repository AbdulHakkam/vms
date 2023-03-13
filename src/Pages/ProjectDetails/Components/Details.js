import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LatestReportTable from "./LatestReportTable";
const Details = (props) => {
  const projectDetails = [
    { field: "Team Name", value: "AppSec" },
    { field: "Date Created", value: "20-20-20" },
    { field: "field3", value: "<details>" },
  ];

  return (
    <Box>
      <Typography sx={{ fontSize: 15, mt: 1.5, ml: 1.5 }}>
        Description :
      </Typography>
      <Box sx={{ display: "flex" ,height:"115px" }}>
        <Box
          sx={{
            width: "70%",
            ml: 0.5,
            borderStyle: "solid",
            borderWidth: "0px",
            borderRadius: 0.5,
          }}
        >
          <Typography sx={{ margin: 1,fontSize:13 }}>
            {props.description}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "25%",
            ml: 1.5,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 1,
          }}
        >
          {projectDetails.map((row) => {
            return (
              <Typography key={row.field} sx={{ margin: 1 ,fontSize:13}}>
                {row.field} : {row.value}
              </Typography>
            );
          })}
        </Box>
      </Box>
      <Divider sx={{ width: "100%", mt: 2 }} />
      <Typography sx={{ fontSize: 20, mt: 21, ml: 1.5 }}>
        Latest scan reports :
      </Typography>
      <LatestReportTable reportData = {props.reportData}/>
    </Box>
  );
};

export default Details;
