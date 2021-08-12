import { useForm } from "react-hook-form";
import React, { useState} from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

interface ILoginForm {
  onSubmit: ({pin}: { pin: number }) => void
  loginError: string | null;
}

const LoginForm = ({ onSubmit, loginError }: ILoginForm) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.pin}>
        <FormLabel htmlFor="pin">Pin</FormLabel>
        <Input
          id="pin"
          type="password"
          placeholder="****"
          {...register("pin", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
            maxLength: { value: 4, message: "Max length should be 4" }
          })}
        />
        <FormErrorMessage>
          {errors.pin && errors.pin.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
      {loginError && <Alert status="error">
        <AlertIcon />
        {loginError}
      </Alert>}
    </form>
  );
}

export default LoginForm
