import React, { useEffect, useState } from 'react';

import { useNoteStore } from '../store/noteStore';

interface NoteEditorProps {
  className?: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ className = '' }) => {
  const { notes, selectedNoteId, updateNote, deleteNote, selectNote } = useNoteStore();

  const selectedNote = selectedNoteId ? notes[selectedNoteId] : null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setIsEditing(false);
    } else {
      setTitle('');
      setContent('');
      setIsEditing(false);
    }
  }, [selectedNote]);

  const handleSave = () => {
    if (selectedNote && (title !== selectedNote.title || content !== selectedNote.content)) {
      updateNote(selectedNote.id, { title: title.trim(), content: content.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (selectedNote && confirm(`Delete note "${selectedNote.title}"?`)) {
      deleteNote(selectedNote.id);
    }
  };

  const handleClose = () => {
    selectNote(null);
  };

  if (!selectedNote) {
    return (
      <div className={`note-editor ${className}`}>
        <div className="note-editor-empty">
          <h3>Select a note to edit</h3>
          <p>Choose a note from the list or create a new one to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`note-editor ${className}`}>
      <div className="note-editor-header">
        <div className="note-editor-title">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="title-input"
            />
          ) : (
            <h1>{selectedNote.title}</h1>
          )}
        </div>

        <div className="note-editor-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Edit
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete
              </button>
              <button onClick={handleClose} className="close-btn">
                ×
              </button>
            </>
          )}
        </div>
      </div>

      <div className="note-editor-content">
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="content-textarea"
          />
        ) : (
          <div className="content-display">{selectedNote.content || <em>No content</em>}</div>
        )}
      </div>

      <div className="note-editor-meta">
        <div className="meta-info">
          <span>Created: {selectedNote.createdAt.toLocaleString()}</span>
          <span>Updated: {selectedNote.updatedAt.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
