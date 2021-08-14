export interface NoteStorage {
  readonly noteValues: Record<string, number>

  getNotes(amount: number): { note: string, number: number }[];
}

export interface INote {
  note: string;
  number: number;
}
