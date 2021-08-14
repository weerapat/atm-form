import BankAccount from './BankAccount';
import PoundNoteStorage from './notestorage/PoundNoteStorage';

jest.mock('./notestorage/PoundNoteStorage');

describe('BankAccount', () => {
  it('should be able to withdraw money', () => {
    const noteStorage = new PoundNoteStorage();
    const instance = new BankAccount(noteStorage);
    instance.withdraw(200);

    expect(noteStorage.getNotes).toHaveBeenCalled();
  });
});
