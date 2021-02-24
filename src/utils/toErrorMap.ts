import { FieldError } from "../generated/graphql";

export const toErrorMap = (errorArray: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errorArray.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
