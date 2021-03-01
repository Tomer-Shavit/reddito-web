import { Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";

import Layout from "../components/layout.component";

import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery({ variables: { limit: 20 } });
  return (
    <Layout varient="regular">
      <NextLink href="/create-post">
        <Link>Create Post</Link>
      </NextLink>
      <br />
      {data ? (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
