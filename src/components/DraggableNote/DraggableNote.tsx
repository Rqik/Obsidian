import { useRef } from 'react';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';

import { updateNote } from '../../store/notes.slice';
import type { Note } from '../../types';
import styles from './DraggableNote.module.scss';

interface Props {
  note: Note;
  connectionCount: number;
}

const DraggableNote = ({ note, connectionCount = 2 }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const handleStop = (_: any, data: { x: number; y: number }) => {
    dispatch(updateNote({ ...note, position: { x: data.x, y: data.y } }));
  };

  return (
    <Draggable position={note.position || { x: 0, y: 0 }} onStop={handleStop} nodeRef={ref}>
      <div className={styles.noteContainer} ref={ref}>
        {[...Array(connectionCount)].map((_, i) => (
          <div
            key={i}
            className={styles.ring}
            style={{
              top: -4 * (i + 1),
              left: -4 * (i + 1),
              right: -4 * (i + 1),
              bottom: -4 * (i + 1),
              borderColor: `rgba(52, 152, 219, ${0.6 - i * 0.1})`, // можно варьировать цвет
              zIndex: 0,
            }}
          />
        ))}
        <div id={`note-${note.id}`} className={styles.note}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableNote;
