import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";

interface IWithdrawalForm {
  currentBalance: number;
  onWithdraw: (amount: number) => void;
}

const WithdrawalForm = ({currentBalance, onWithdraw}: IWithdrawalForm) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = ({ amount }: any) => {
    onWithdraw(amount);
    reset({ amount: '' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={4} textAlign="center">
        Available balance: £{currentBalance}
      </Box>
      <FormControl isInvalid={errors.pin}>
        <FormLabel htmlFor="amount">Amount</FormLabel>
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
