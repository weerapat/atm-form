import React, { useState} from "react";
import LoginAPI from "../api/LoginAPI";
import LoginForm from "./LoginForm";
import WithdrawalForm from "./WithdrawalForm";
import { useToast, Box } from "@chakra-ui/react"

const loginAPI = new LoginAPI();

class BankAccount {
  protected noteStorage: NoteStorage;

  constructor(noteStorage: NoteStorage) {
    this.noteStorage = noteStorage;
  }

  public withdraw(amount: number) {
    return this.noteStorage.getNotes(amount);
  }
}

class NoteStorage {
  protected notes: any = {
    '£5': 4,
    '£10': 15,
    '£20': 7,
  };

  getNotes(amount: number) {
    // this.calculateNotes(amount, {...this.notes});
    this.decreaseNote('£10', 5)

    console.log(this.notes)

    return [
      {note: '£5', number: 3},
      {note: '£10', number: 5},
      {note: '£20', number: 2},
    ]
  }

  private calculateNotes(amount: number, notes: any) {

    const returnNotes = {};

    // if (amount > 20) {
    //   returnNotes['£20'] = amount % 20 >
    // }

    if (!amount) {
      return
    }

    throw Error('Not enough notes');
  }

  private decreaseNote(note: string, number: number) {
    this.notes[note] = this.notes[note] - number;
  }
}

const bankAccount = new BankAccount(new NoteStorage());

const ATMForm = () => {
  const toast = useToast()
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  const handleWithdraw = (amount: number) => {
    try {
      const notes = bankAccount.withdraw(amount);
      setCurrentBalance(currentBalance - amount);

      toast({
        status: "success",
        duration: 15000,
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            <h2>Withdraw successfully.</h2>
            {notes.map(({ note, number}) => (
              <div>{note} {number}</div>
            ))}
            total: £{amount}
          </Box>
        ),
      })
    } catch (e) {
      toast({
        title: "Withdraw failed.",
        description: e.response.data.error,
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
