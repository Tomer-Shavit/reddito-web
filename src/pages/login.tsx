import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import InputField from "../components/input-field.component";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import NextLink from "next/link";
import Layout from "../components/layout.component";
const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Layout varient="small">
      <Text fontSize="2xl">Login</Text>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        // values: values of the fields
        // setError: a formik attribute that show an error in the selected field and show the error we sent from the server
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            usernameOrEmail: values.usernameOrEmail,
            password: values.password,
          });

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (router.query.next) {
              router.push(`${router.query.next}`);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="usernameOrEmail"
                placeholder="Username or Email"
                label="Username"
                type="text"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                type="password"
                label="Password"
              ></InputField>
            </Box>
            <Flex>
              <NextLink href="/forgot-password">
                <Link mt={2} ml="auto">
                  Forgot password?
                </Link>
              </NextLink>
            </Flex>
            <Button
              mt={4}
              backgroundColor="#4c4696"
              color="white"
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
