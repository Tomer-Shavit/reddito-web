import { Alert, AlertIcon, Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";

import React from "react";
import InputField from "../components/input-field.component";
import { Wrapper } from "../components/wrapper.component";
import { createUrqlClient } from "../utils/createUrqlClient";

import { useForgotPasswordMutation } from "../generated/graphql";
import { useState } from "react";

const ForgotPassword: NextPage<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper size="small">
      <Formik
        initialValues={{ email: "" }}
        // values: values of the fields
        // setError: a formik attribute that show an error in the selected field
        onSubmit={async (values) => {
          await forgotPassword({
            email: values.email,
          });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Alert status="success">
              <AlertIcon />
              We sent you an email.
            </Alert>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField
                  name="eamil"
                  placeholder="Email"
                  label="Email"
                  type="email"
                ></InputField>
              </Box>

              <Button
                mt={4}
                backgroundColor="#68D391"
                color="white"
                type="submit"
                isLoading={isSubmitting}
              >
                Send Email
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
