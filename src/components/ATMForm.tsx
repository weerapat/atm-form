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
  protected notes: Record<string, number> = {
    '£5': 4,
    '£10': 15,
    '£20': 7,
  };

  getNotes(amount: number) {
    const notes = this.calculateNotes(amount, {...this.notes});

    notes.forEach(({ note, number }: { note: string; number: number }) =>
      this.decreaseNote(note, number))

    console.log(this.notes)

    return notes
  }

  private calculateNotes(amount: number, notes: any) {

    const returnNotes: any = [];

    if (amount >= 20) {
      let noteNumber = Math.floor(amount / 20);
      noteNumber = noteNumber < notes['£20'] ? noteNumber : notes['£20'];

      if (noteNumber) {
        returnNotes.push({note: '£20', number: noteNumber})
        amount = amount - (noteNumber * 20);
      }
    }

    if (amount >= 10) {
      let noteNumber = Math.floor(amount / 10);
      noteNumber = noteNumber < notes['£10'] ? noteNumber : notes['£10'];

      if (noteNumber) {
        returnNotes.push({note: '£10', number: noteNumber})
        amount = amount - (noteNumber * 10);
      }
    }

    if (amount >= 5) {
      let noteNumber = Math.floor(amount / 5);
      noteNumber = noteNumber < notes['£5'] ? noteNumber : notes['£5'];

      if (noteNumber) {
        returnNotes.push({note: '£5', number: noteNumber})
        amount = amount - (noteNumber * 5);
      }
    }

    console.log(returnNotes)
    console.log(amount)

    if (!amount) {
      return returnNotes;
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
            {notes.map(({note, number}: {note: string, number: number}) => (
              <div key={note}>{note} {number}</div>
            ))}
            total: £{amount}
          </Box>
        ),
      })
    } catch (e) {
      console.log(e.message);
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
