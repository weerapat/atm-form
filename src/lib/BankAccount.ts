import { NoteStorage } from "./notestorage/types";

export default class BankAccount {
  protected noteStorage: NoteStorage;

  constructor(noteStorage: NoteStorage) {
    this.noteStorage = noteStorage;
  }

  public withdraw(amount: number) {
    return this.noteStorage.getNotes(amount);
  }
}
