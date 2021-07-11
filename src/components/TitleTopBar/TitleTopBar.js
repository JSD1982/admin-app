import React from "react";

import baseModule from "contabilium-base-module";
const {Typography, Icon} = baseModule.components;


const TitleTopBar = ({titleName, iconName}) => {
  
  return (
    <>
      <div className="topbar-title">
        <Typography variant="h4" component="h2">
          <Icon name={iconName} fontSize="large"/>
          {titleName}
        </Typography>
      </div>
    </>
  );
};

export default TitleTopBar;

