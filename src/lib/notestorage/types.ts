export interface NoteStorage {
  readonly noteValues: Record<string, number>

  getNotes(amount: number): INote[];
}

export interface INote {
  note: string;
  number: number;
}
