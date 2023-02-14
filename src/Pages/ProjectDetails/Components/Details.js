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
      <Box sx={{ display: "flex" }}>
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
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
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
      <Typography sx={{ fontSize: 15, mt: 1.5, ml: 1.5 }}>
        Latest scan reports :
      </Typography>
      <LatestReportTable reportData = {props.reportData}/>
    </Box>
  );
};

export default Details;
