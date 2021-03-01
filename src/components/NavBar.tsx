import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

// import { isServer } from "../utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery(); //Check out 4:10:00 in the video, adding a pause parameter
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body = null;

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
    <Flex
      zIndex={1}
      position="sticky"
      top="0"
      w={"100%"}
      backgroundColor="#9be6f2"
      p={4}
      alignContent="center"
    >
      <Box>
        <NextLink href="/">
          <Text fontSize="xl" fontWeight="bold" cursor="pointer">
            REDDITO
          </Text>
        </NextLink>
      </Box>
      <Flex ml={"auto"}>{body}</Flex>
    </Flex>
  );
};

export default NavBar;
