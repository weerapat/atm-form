import React, { useState} from "react";
import LoginAPI from "../api/LoginAPI";
import LoginForm from "./LoginForm";
import WithdrawalForm from "./WithdrawalForm";
import { useToast, Box } from "@chakra-ui/react"

const loginAPI = new LoginAPI();

export default function ATMForm() {
  const toast = useToast()
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  const [banknotes, setBanknotes] = useState<any>({
    '£5': 4,
    '£10': 15,
    '£20': 7,
  })

  const handleWithdraw = (amount: number) => {
    setCurrentBalance(currentBalance - amount);

    toast({
      title: "Withdraw successfully.",
      description: "You've got notes",
      status: "success",
      duration: 9000,
      isClosable: true,
      render: () => (
        <Box color="white" p={3} bg="blue.500">
          £5 : 1 <br/>
          £10 : 2 <br/>
          £20 : 3 <br/>
          total: £{amount}
        </Box>
      ),
    })
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
