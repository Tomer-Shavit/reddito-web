import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Link,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";

import React from "react";
import { useState } from "react";
import InputField from "../../components/input-field.component";
import { Wrapper } from "../../components/wrapper.component";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";

const ChangePassword: NextPage = ({}) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ newPassword: "" }}
        // values: values of the fields
        // setError: a formik attribute that show an error in the selected field
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "", //The name of the query param is token because of the file name
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="newPassword"
                placeholder="New Password"
                label="New Password"
                type="password"
              ></InputField>
            </Box>
            {tokenError ? (
              <Alert mt={4} status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{tokenError}.</AlertTitle>
                <AlertDescription>
                  <NextLink href="/forgot-password">
                    <Link>Click here to reset it again.</Link>
                  </NextLink>
                </AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            ) : null}
            <Button
              mt={4}
              backgroundColor="#68D391"
              color="white"
              type="submit"
              isLoading={isSubmitting}
            >
              Set New Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword as any);
