import { FC } from "react";
import NavBar from "./NavBar";
import { WrappedVarient, Wrapper } from "./wrapper.component";

interface LayoutProps {
  varient: WrappedVarient;
}

const Layout: FC<LayoutProps> = ({ children, varient = "regular" }) => {
  return (
    <>
      <NavBar></NavBar>
      <Wrapper varient={varient}>{children}</Wrapper>
    </>
  );
};

export default Layout;
