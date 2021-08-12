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
import LoginAPI from "../api/LoginAPI";

const loginAPI = new LoginAPI();

export default function ATMForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const [loginError, setLoginError] = useState<string | null>(null);
   const onSubmit = async ({pin}: { pin: number }) => {

   try {
     const currentBalance = await loginAPI.login(pin);
     console.log(currentBalance)
     setLoginError(null)
   } catch (e) {
     setLoginError(e.response.data.error)
   }
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
      {loginError && <Alert status="error">
        <AlertIcon />
        {loginError}
      </Alert>}
    </form>
  );
}
