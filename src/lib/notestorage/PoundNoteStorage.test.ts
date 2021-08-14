import PoundNoteStorage from './PoundNoteStorage';

describe('BankAccount', () => {
  it('should be able to get notes from given amount', () => {
    const noteStorage = new PoundNoteStorage();
    const notes = noteStorage.getNotes(135);

    expect(notes).toEqual([
      { note: '£20', number: 6 },
      { note: '£10', number: 1 },
      { note: '£5', number: 1 }
    ]);
  });

  it('throws an error when given amount is not match with existing notes', () => {
    const noteStorage = new PoundNoteStorage();
    expect(() => noteStorage.getNotes(111)).toThrow('ATM doesn\'t have enough notes');
  });
});
