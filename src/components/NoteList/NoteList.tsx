import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addNote, deleteNote, selectAllNotes, selectNote, selectSelectedNoteId } from '../noteSlice';
import styles from './NoteList.module.scss';

const NoteList: React.FC = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectAllNotes);
  const selectedNoteId = useAppSelector(selectSelectedNoteId);

  const handleAddNote = () => {
    dispatch(addNote({ title: 'New Note', content: '' }));
  };

  const handleSelectNote = (noteId: string) => {
    dispatch(selectNote(noteId));
  };

  const handleDeleteNote = (noteId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(noteId));
    }
  };

  return (
    <div className={styles.noteList}>
      <div className={styles.header}>
        <h2>Notes</h2>
        <button className={styles.addButton} onClick={handleAddNote} aria-label="Add new note">
          + New Note
        </button>
      </div>

      <div className={styles.list}>
        {notes.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No notes yet. Create your first note!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`${styles.noteItem} ${selectedNoteId === note.id ? styles.selected : ''}`}
              onClick={() => handleSelectNote(note.id)}
            >
              <div className={styles.noteContent}>
                <h3 className={styles.title}>{note.title}</h3>
                <p className={styles.preview}>
                  {note.content.substring(0, 100)}
                  {note.content.length > 100 ? '...' : ''}
                </p>
                <div className={styles.meta}>
                  <span className={styles.date}>{note.updatedAt.toLocaleDateString()}</span>
                  {note.linkedNotes.length > 0 && (
                    <span className={styles.linkCount}>
                      {note.linkedNotes.length} link{note.linkedNotes.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
              <button
                className={styles.deleteButton}
                onClick={(e) => handleDeleteNote(note.id, e)}
                aria-label="Delete note"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;
