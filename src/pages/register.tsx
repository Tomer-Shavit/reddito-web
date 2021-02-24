import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import InputField from "../components/input-field.component";
import { Wrapper } from "../components/wrapper.component";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper size="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        // values: values of the fields
        // setError: a formik attribute that show an error in the selected field
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            options: {
              email: values.email,
              username: values.username,
              password: values.password,
            },
          });

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
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
            <Button
              mt={4}
              backgroundColor="#68D391"
              color="white"
              type="submit"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
