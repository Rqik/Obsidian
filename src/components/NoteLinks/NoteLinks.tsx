import React, { useState } from 'react';

import { useNoteStore } from '../store/noteStore';

interface NoteLinksProps {
  className?: string;
}

const NoteLinks: React.FC<NoteLinksProps> = ({ className = '' }) => {
  const { notes, selectedNoteId, linkNotes, unlinkNotes, selectNote } = useNoteStore();
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  const selectedNote = selectedNoteId ? notes[selectedNoteId] : null;

  if (!selectedNote) {
    return null;
  }

  const availableNotes = Object.values(notes).filter(
    (note) => note.id !== selectedNote.id && !selectedNote.linkedNoteIds.includes(note.id),
  );

  const linkedNotes = selectedNote.linkedNoteIds.map((id) => notes[id]).filter(Boolean);

  const handleLinkNote = (targetId: string) => {
    linkNotes(selectedNote.id, targetId);
    setShowLinkDialog(false);
  };

  const handleUnlinkNote = (targetId: string) => {
    unlinkNotes(selectedNote.id, targetId);
  };

  const handleNavigateToNote = (noteId: string) => {
    selectNote(noteId);
  };

  return (
    <div className={`note-links ${className}`}>
      <div className="note-links-header">
        <h3>Linked Notes</h3>
        {availableNotes.length > 0 && (
          <button onClick={() => setShowLinkDialog(true)} className="add-link-btn">
            + Add Link
          </button>
        )}
      </div>

      {linkedNotes.length === 0 ? (
        <p className="no-links">No linked notes</p>
      ) : (
        <div className="linked-notes-list">
          {linkedNotes.map((note) => (
            <div key={note.id} className="linked-note-item">
              <div className="linked-note-title" onClick={() => handleNavigateToNote(note.id)}>
                {note.title}
              </div>
              <button onClick={() => handleUnlinkNote(note.id)} className="unlink-btn" title="Remove link">
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {showLinkDialog && (
        <div className="link-dialog-overlay">
          <div className="link-dialog">
            <div className="link-dialog-header">
              <h4>Link to Note</h4>
              <button onClick={() => setShowLinkDialog(false)} className="close-dialog-btn">
                ×
              </button>
            </div>

            <div className="available-notes-list">
              {availableNotes.map((note) => (
                <div key={note.id} className="available-note-item" onClick={() => handleLinkNote(note.id)}>
                  <div className="available-note-title">{note.title}</div>
                  <div className="available-note-preview">
                    {note.content.substring(0, 50)}
                    {note.content.length > 50 && '...'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteLinks;
