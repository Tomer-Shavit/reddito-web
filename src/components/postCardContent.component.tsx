import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { PostSnippetFragment } from "../generated/graphql";

interface props {
  post: PostSnippetFragment;
}

export const PostCardContent: FC<props> = ({ post }) => {
  return (
    <Flex direction="column">
      <Heading fontSize="xl">{post.title}</Heading>
      <Text>Posted by {post.creator.username} </Text>
      <Text mt={4}>{post.textSnippet}</Text>
    </Flex>
  );
};
