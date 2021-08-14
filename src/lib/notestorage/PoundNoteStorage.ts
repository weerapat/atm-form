import { INote, NoteStorage } from "./types";

export default class PoundNoteStorage implements NoteStorage {
  readonly noteValues: Record<string, number> = {
    '£20': 20,
    '£10': 10,
    '£5': 5,
  }

  protected notes: Record<string, number> = {
    '£5': 4,
    '£10': 15,
    '£20': 7,
  };

  getNotes(amount: number): INote[] {
    const notes = this.calculateNotes(amount, {...this.notes});

    notes.forEach(({ note, number }: { note: string; number: number }) =>
      this.decreaseNote(note, number))

    return notes
  }

  /**
   * Calculate the number of banknotes from a given amount
   *
   * @param amount
   * @param notes
   * @private
   */
  private calculateNotes(amount: number, notes: Record<string, number>): INote[] | never  {
    const returnNotes: INote[] = [];

    for (const noteValue in this.noteValues) {
      if (amount >= this.noteValues[noteValue]) {
        let noteNumber = Math.floor(amount / this.noteValues[noteValue]);
        noteNumber = noteNumber < notes[noteValue] ? noteNumber : notes[noteValue];

        if (noteNumber) {
          returnNotes.push({note: noteValue, number: noteNumber})
          amount = amount - (noteNumber * this.noteValues[noteValue]);
        }
      }
    }

    if (!amount) {
      return returnNotes;
    }

    throw new Error('Has not enough notes');
  }

  private decreaseNote(note: string, number: number) {
    this.notes[note] = this.notes[note] - number;
  }
}
