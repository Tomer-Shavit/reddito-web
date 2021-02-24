import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  size?: "regular" | "small";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  size = "regular",
}) => {
  return (
    <Box
      maxW={size === "regular" ? "800px" : "420px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};
