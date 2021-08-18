import { INote, INoteValue, NoteStorage } from "./types";
import { shuffle } from "../utils";

export default class PoundNoteStorage implements NoteStorage {
  readonly noteValues: INoteValue[] = [
    { name: '£20', value: 20 },
    { name: '£10', value: 10 },
    { name: '£5', value: 5 },
  ];

  protected notes: Record<string, number> = {
    '£5': 4,
    '£10': 15,
    '£20': 7,
  };

  getNotes(amount: number): INote[] {
    const notes = this.calculateNotes(amount, {...this.notes});

    notes.forEach(({ note, number }: INote) =>
      this.decreaseNote(note, number))

    return notes
  }

  /**
   * Calculate the number of banknotes from a given amount
   *
   * @param requiredAmount
   * @param remainingNotes
   * @private
   */
  private calculateNotes(requiredAmount: number, remainingNotes: Record<string, number>): INote[] | never  {
    const returnNotes: INote[] = [];
    let collectedNotes: Record<string, number> = {};

    while (requiredAmount !== 0) {
      // Shuffle randomly banknotes order.
      const shuffledNotes = shuffle(this.noteValues);
      let foundNote = false;

      for (const {name, value} of shuffledNotes) {
        // If found a matching note, collect it and exit from the loop.
        if (remainingNotes[name] > 0 && value <= requiredAmount) {
          foundNote = true

          if (collectedNotes[name]) {
            collectedNotes[name] = collectedNotes[name] + 1;
          } else {
            collectedNotes[name] = 1;
          }

          requiredAmount = requiredAmount - value;
          break;
        }
      }

      if (!foundNote) {
        throw new Error('ATM doesn\'t have banknotes that match your withdrawal amount, please try again');
      }
    }

    for (const collectedNote in collectedNotes) {
      returnNotes.push({note: collectedNote, number: collectedNotes[collectedNote]})
    }

    return returnNotes;
  }

  private decreaseNote(note: string, number: number) {
    this.notes[note] = this.notes[note] - number;
  }
}
