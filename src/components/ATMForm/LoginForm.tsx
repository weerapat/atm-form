import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

interface ILoginForm {
  onSubmit: ({pin}: { pin: number }) => void
}

const LoginForm = ({ onSubmit }: ILoginForm) => {
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
    </form>
  );
}

export default LoginForm
