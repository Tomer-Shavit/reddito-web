import { Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
// import { isServer } from "../utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery(); //Check out 4:10:00 in the video, adding a pause parameter
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  console.log({ data });

  //fetching the user
  if (fetching) {
    body = null;
    //user not logged in
  } else if (!data?.me?.username) {
    body = (
      <>
        <NextLink href={"/register"}>
          <Link>REGISTER</Link>
        </NextLink>
        <NextLink href={"/login"}>
          <Link ml={2}>LOGIN</Link>
        </NextLink>
      </>
    );
    //user is logged in
  } else {
    body = (
      <Flex>
        <Text mr={2}>Hello, {`${data.me.username}`}</Text>
        <Button
          variant="link"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          LOGOUT
        </Button>
      </Flex>
    );
  }
  return (
    <Flex w={"100%"} backgroundColor="#81E6D9" p={4}>
      <Flex ml={"auto"}>{body}</Flex>
    </Flex>
  );
};

export default NavBar;
