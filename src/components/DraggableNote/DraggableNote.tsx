import { useRef } from 'react';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';

import { updateNote } from '../../store/notes.slice';
import type { Note } from '../../types';
import styles from './DraggableNote.module.scss';

interface Props {
  note: Note;
}

const DraggableNote = ({ note }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const handleStop = (_: any, data: { x: number; y: number }) => {
    dispatch(updateNote({ ...note, position: { x: data.x, y: data.y } }));
  };

  return (
    <Draggable position={note.position || { x: 0, y: 0 }} onStop={handleStop} nodeRef={ref}>
      <div id={`note-${note.id}`} ref={ref} className={styles.note}>
        <h4>{note.title}</h4>
        <p>{note.content}</p>
      </div>
    </Draggable>
  );
};

export default DraggableNote;
