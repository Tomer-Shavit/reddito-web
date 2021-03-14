import { Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";

import Layout from "../components/layout.component";

import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import React from "react";
import { useState } from "react";
import { UpvoteBox } from "../components/upvoteBox.component";
import { PostCardContent } from "../components/postCardContent.component";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 20,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({ variables });

  if (!fetching && !data) {
    return <Text>Oops something went wrong :(</Text>;
  }

  return (
    <Layout varient="regular">
      <Flex alignItems="center">
        <Text fontSize="4xl">Reddito</Text>
        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      <br />
      {fetching && !data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((post) => {
            return (
              <Flex p={4} key={post.id} shadow="md" borderWidth="1px">
                <UpvoteBox post={post} />
                <PostCardContent post={post} />
              </Flex>
            );
          })}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            my={5}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
