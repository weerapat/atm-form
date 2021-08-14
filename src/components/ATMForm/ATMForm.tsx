import React, { useState} from "react";
import LoginAPI from "../../api/LoginAPI";
import LoginForm from "./LoginForm";
import WithdrawalForm from "./WithdrawalForm";
import { useToast, Box } from "@chakra-ui/react"
import PoundNoteStorage from "../../lib/notestorage/PoundNoteStorage";
import BankAccount from "../../lib/BankAccount";
import {INote} from "../../lib/notestorage/types";

const loginAPI = new LoginAPI();
const bankAccount = new BankAccount(new PoundNoteStorage());

const ATMForm = () => {
  const overdraft = 100;
  const toast = useToast()
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  const handleWithdraw = (amount: number) => {
    try {
      if (currentBalance - amount < -overdraft ) {
        throw new Error('Exceeding the available balance')
      }
      const notes = bankAccount.withdraw(amount);
      setCurrentBalance(currentBalance - amount);

      toast({
        status: "success",
        duration: 15000,
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            <h2>Withdraw successfully.</h2>
            {notes.map(({note, number}: INote) => (
              <div key={note}>{note} {number}</div>
            ))}
            total: £{amount}
          </Box>
        ),
      })
    } catch (e) {
      toast({
        title: "Withdraw failed.",
        description: e.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const handleLoginSubmit = async ({pin}: { pin: number }) => {
    try {
      const currentBalance = await loginAPI.login(pin);
      setLoginStatus(true);
      setCurrentBalance(currentBalance)
    } catch (e) {
      toast({
        title: "Login failed.",
        description: e.response.data.error,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
  }

  if (!loginStatus) {
    return (
      <LoginForm onSubmit={handleLoginSubmit}/>
    );
  }

  return (
    <WithdrawalForm currentBalance={currentBalance} onWithdraw={handleWithdraw} />
  );
}

export default ATMForm;
