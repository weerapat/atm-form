export interface NoteStorage {
  readonly noteValues: INoteValue[]

  getNotes(amount: number): INote[];
}

export interface INote {
  note: string;
  number: number;
}

export interface INoteValue {
  name: string;
  value: number;
}
