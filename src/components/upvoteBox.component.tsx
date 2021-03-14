import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { FC } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface props {
  post: PostSnippetFragment;
}

export const UpvoteBox: FC<props> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <ChevronUpIcon
        cursor="pointer"
        w={8}
        h={8}
        onClick={() =>
          vote({
            postId: post.id,
            value: 1,
          })
        }
      ></ChevronUpIcon>
      {post.points}
      <ChevronDownIcon
        cursor="pointer"
        w={8}
        h={8}
        onClick={() =>
          vote({
            postId: post.id,
            value: -1,
          })
        }
      ></ChevronDownIcon>
    </Flex>
  );
};
