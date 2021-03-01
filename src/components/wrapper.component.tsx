import { Box } from "@chakra-ui/react";
import React from "react";

export type WrappedVarient = "regular" | "small";

interface WrapperProps {
  varient: WrappedVarient;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  varient: size = "regular",
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
