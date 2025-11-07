import * as Icons from "@mui/icons-material";
import React from "react";

type IconProps = {
  name: string;
};

const DynamicIcon: React.FC<IconProps> = ({ name }) => {
  const IconComponent = (Icons as Record<string, React.ComponentType>)[name];

  if (!IconComponent) {
    console.warn(`MUI icon "${name}" not found`);
    return null;
  }

  return <IconComponent />;
};

export default DynamicIcon;
