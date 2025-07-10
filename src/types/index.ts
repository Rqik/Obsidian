export interface Note {
  id: string;
  title: string;
  content: string;
  linkedNotes: string[];
  createdAt: Date;
  updatedAt: Date;
  position: {
    x: number;
    y: number;
  };
}

export interface NotesState {
  notes: Note[];
  selectedNoteId: string | null;
  isLoading: boolean;
  error: string | null;
}
