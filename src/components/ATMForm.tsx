import { useForm } from "react-hook-form";
import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button
} from "@chakra-ui/react";

export default function ATMForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  function onSubmit(values: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 2000);
    });
  }
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
