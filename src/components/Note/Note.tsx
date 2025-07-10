import React, { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { linkNotes, selectAllNotes, selectLinkedNotes, selectNoteById, updateNote } from '../../store/notes.slice';
import type { Note as NoteType } from '../../types';
import { Button } from '../Button';
import styles from './Note.module.scss';

interface NoteProps {
  noteId: string;
}

const Note: React.FC<NoteProps> = ({ noteId }) => {
  const dispatch = useAppDispatch();
  const note = useAppSelector((state) => selectNoteById(state, noteId));
  const linkedNotes = useAppSelector((state) => selectLinkedNotes(state, noteId));
  const allNotes = useAppSelector(selectAllNotes);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = useCallback(() => {
    if (note && (title !== note.title || content !== note.content)) {
      const updatedNote: NoteType = {
        ...note,
        title: title.trim() || 'Untitled',
        content,
      };
      dispatch(updateNote(updatedNote));
    }
    setIsEditing(false);
  }, [note, title, content, dispatch]);

  const handleCancel = useCallback(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
    setIsEditing(false);
  }, [note]);

  const handleLinkNote = useCallback(
    (targetNoteId: string) => {
      if (note) {
        dispatch(linkNotes({ fromId: note.id, toId: targetNoteId }));
      }
      setShowLinkDialog(false);
    },
    [note, dispatch],
  );

  if (!note) {
    return (
      <div className={styles.emptyState}>
        <p>Select a note to view or edit</p>
      </div>
    );
  }

  const availableNotesToLink = allNotes.filter((n) => n.id !== note.id && !note.linkedNotes.includes(n.id));

  return (
    <div className={styles.note}>
      <div className={styles.header}>
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
            placeholder="Note title..."
          />
        ) : (
          <h1 className={styles.title}>{note.title}</h1>
        )}

        <div className={styles.actions}>
          {isEditing ? (
            <>
              <Button variant="save" onClick={handleSave}>
                Save
              </Button>
              <Button variant="cancel" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="edit" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.contentInput}
            placeholder="Write your note..."
            rows={20}
          />
        ) : (
          <div className={styles.contentDisplay}>
            {content ? (
              <pre className={styles.preformatted}>{content}</pre>
            ) : (
              <p className={styles.placeholder}>This note is empty. Click Edit to add content.</p>
            )}
          </div>
        )}
      </div>

      <div className={styles.linkedNotes}>
        <div className={styles.linkedHeader}>
          <h3>Linked Notes</h3>
          <Button variant="link" onClick={() => setShowLinkDialog(true)} disabled={availableNotesToLink.length === 0}>
            + Link Note
          </Button>
        </div>

        {linkedNotes.length > 0 ? (
          <div className={styles.linksList}>
            {linkedNotes.map((linkedNote) => (
              <div key={linkedNote.id} className={styles.linkedNote}>
                <span className={styles.linkedTitle}>{linkedNote.title}</span>
                <span className={styles.linkedPreview}>
                  {linkedNote.content.substring(0, 50)}
                  {linkedNote.content.length > 50 ? '...' : ''}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noLinks}>No linked notes</p>
        )}
      </div>

      {showLinkDialog && (
        <div className={styles.linkDialog}>
          <div className={styles.dialogContent}>
            <h3>Link to Note</h3>
            <div className={styles.notesList}>
              {availableNotesToLink.map((availableNote) => (
                <button
                  key={availableNote.id}
                  onClick={() => handleLinkNote(availableNote.id)}
                  className={styles.linkOption}
                >
                  <strong>{availableNote.title}</strong>
                  <span>{availableNote.content.substring(0, 80)}</span>
                </button>
              ))}
            </div>
            <Button variant="cancel" onClick={() => setShowLinkDialog(false)} className={styles.closeDialog}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className={styles.meta}>
        <span>Created: {note.createdAt.toLocaleString()}</span>
        <span>Updated: {note.updatedAt.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Note;
