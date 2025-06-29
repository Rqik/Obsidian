import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Note, NotesState } from '../types';
import type { RootState } from './store';

const STORAGE_KEY = 'obsidian-notes';

// Load notes from localStorage
const loadNotesFromStorage = (): Note[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    }
  } catch (error) {
    console.error('Failed to load notes from storage:', error);
  }
  return [];
};

// Save notes to localStorage
const saveNotesToStorage = (notes: Note[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes to storage:', error);
  }
};

const initialState: NotesState = {
  notes: loadNotesFromStorage(),
  selectedNoteId: null,
  isLoading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Partial<Note>>) => {
      const now = new Date();
      const newNote: Note = {
        id: uuidv4(),
        title: action.payload.title || 'New Note',
        content: action.payload.content || '',
        linkedNotes: action.payload.linkedNotes || [],
        createdAt: now,
        updatedAt: now,
      };
      state.notes.push(newNote);
      state.selectedNoteId = newNote.id;
      saveNotesToStorage(state.notes);
    },

    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = {
          ...action.payload,
          updatedAt: new Date(),
        };
        saveNotesToStorage(state.notes);
      }
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);

      // Remove references to deleted note from other notes
      state.notes.forEach((note) => {
        note.linkedNotes = note.linkedNotes.filter((id) => id !== action.payload);
      });

      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = null;
      }

      saveNotesToStorage(state.notes);
    },

    selectNote: (state, action: PayloadAction<string | null>) => {
      state.selectedNoteId = action.payload;
    },

    linkNotes: (state, action: PayloadAction<{ fromId: string; toId: string }>) => {
      const { fromId, toId } = action.payload;
      const fromNote = state.notes.find((note) => note.id === fromId);

      if (fromNote && !fromNote.linkedNotes.includes(toId)) {
        fromNote.linkedNotes.push(toId);
        fromNote.updatedAt = new Date();
        saveNotesToStorage(state.notes);
      }
    },

    unlinkNotes: (state, action: PayloadAction<{ fromId: string; toId: string }>) => {
      const { fromId, toId } = action.payload;
      const fromNote = state.notes.find((note) => note.id === fromId);

      if (fromNote) {
        fromNote.linkedNotes = fromNote.linkedNotes.filter((id) => id !== toId);
        fromNote.updatedAt = new Date();
        saveNotesToStorage(state.notes);
      }
    },

    loadFromStorage: (state) => {
      state.notes = loadNotesFromStorage();
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Selectors
export const selectAllNotes = (state: RootState) => state.notes.notes;
export const selectSelectedNoteId = (state: RootState) => state.notes.selectedNoteId;
export const selectIsLoading = (state: RootState) => state.notes.isLoading;
export const selectError = (state: RootState) => state.notes.error;

export const selectNoteById = createSelector(
  [selectAllNotes, (state: RootState, noteId: string) => noteId],
  (notes, noteId) => notes.find((note) => note.id === noteId),
);

export const selectSelectedNote = createSelector([selectAllNotes, selectSelectedNoteId], (notes, selectedId) =>
  selectedId ? notes.find((note) => note.id === selectedId) : null,
);

export const selectLinkedNotes = createSelector(
  [selectAllNotes, (state: RootState, noteId: string) => noteId],
  (notes, noteId) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return [];
    return note.linkedNotes.map((id) => notes.find((n) => n.id === id)).filter((n): n is Note => n !== undefined);
  },
);

export const {
  addNote,
  updateNote,
  deleteNote,
  selectNote,
  linkNotes,
  unlinkNotes,
  loadFromStorage,
  setError,
  setLoading,
} = notesSlice.actions;

export default notesSlice.reducer;
