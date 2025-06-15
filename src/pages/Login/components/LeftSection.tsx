import React from "react";
import { Box } from "@mui/material";
import { LeftSection as StyledLeftSection } from "./StyledComponents";
import trafficLight from "../../../assets/traffic-light.webp";

const LeftSection: React.FC = () => {
  return (
    <StyledLeftSection>
      <Box
        component="img"
        src={trafficLight}
        alt="Traffic Light"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </StyledLeftSection>
  );
};

export default LeftSection;
