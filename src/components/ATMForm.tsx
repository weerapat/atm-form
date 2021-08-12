import React, { useState} from "react";
import LoginAPI from "../api/LoginAPI";
import LoginForm from "./LoginForm";
import WithdrawalForm from "./WithdrawalForm";

const loginAPI = new LoginAPI();

export default function ATMForm() {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
   const handleLoginSubmit = async ({pin}: { pin: number }) => {

   try {
     const currentBalance = await loginAPI.login(pin);
     setLoginStatus(true);
     setCurrentBalance(currentBalance)
     setLoginError(null)
   } catch (e) {
     setLoginError(e.response.data.error)
   }
  }
  if (!loginStatus) {
    return (
      <LoginForm onSubmit={handleLoginSubmit} loginError={loginError} />
    );
  }

  return (
    <WithdrawalForm currentBalance={currentBalance} />
  );
}
