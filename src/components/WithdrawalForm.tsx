import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

class BankAccount {
  protected balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  public withdraw() {
    return {
      ten: 20,
      five: 5,
    }
  }
}

interface IWithdrawalForm {
  currentBalance: number;
  onWithdraw: (amount: number) => void;
}

const WithdrawalForm = ({currentBalance, onWithdraw}: IWithdrawalForm) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = ({ amount }: any) => {
    onWithdraw(amount);
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
