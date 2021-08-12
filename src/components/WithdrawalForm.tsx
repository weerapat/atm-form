import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

interface IWithdrawalForm {
  currentBalance: number;
}

const WithdrawalForm = ({currentBalance}: IWithdrawalForm) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = (values: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 2000);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Balance: {currentBalance}
      <FormControl isInvalid={errors.pin}>
        <FormLabel htmlFor="pin">Amount</FormLabel>
        <Input
          id="amount"
          type="number"
          placeholder="0"
          {...register("amount", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.amount && errors.amount.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Withdraw
      </Button>
    </form>
  );
}

export default WithdrawalForm
