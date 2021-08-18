import PoundNoteStorage from './PoundNoteStorage';
import { INote } from './types';

export const poundNoteValues: Record<string, number> = {
  '£20': 20,
  '£10': 10,
  '£5': 5,
}

describe('BankAccount', () => {
  it('should be able to get notes from given amount', () => {
    const noteStorage = new PoundNoteStorage();
    const requiredAmount = 135;
    const notes = noteStorage.getNotes(requiredAmount);

    let returnAmount: number = 0
    notes.forEach(({ note, number}: INote) => {
      returnAmount = returnAmount + (poundNoteValues[note] * number)
    })

    expect(requiredAmount).toEqual(returnAmount)
  });

  it('throws an error when the given amount does not match with existing banknotes', () => {
    const noteStorage = new PoundNoteStorage();
    expect(() => noteStorage.getNotes(111))
      .toThrow('ATM doesn\'t have banknotes that match your withdrawal amount, please try again');
  });
});
