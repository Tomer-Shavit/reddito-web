import { Box, Button, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";

import React from "react";
import InputField from "../components/input-field.component";
import Layout from "../components/layout.component";
import TextareaField from "../components/textarea.component";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAurh";

const CreatePost: NextPage = () => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  useIsAuth();
  return (
    <Layout varient="small">
      <Text fontSize="2xl">Create Post</Text>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const response = await createPost({
            input: values,
          });

          if (!response.error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="title"
                placeholder="Title"
                label="Title"
                type="text"
              ></InputField>
            </Box>
            <Box mt={4}>
              <TextareaField
                name="text"
                placeholder="Whats on your mind?"
                label="Body"
              ></TextareaField>
            </Box>
            <Button
              mt={4}
              backgroundColor="#4c4696"
              color="white"
              type="submit"
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
