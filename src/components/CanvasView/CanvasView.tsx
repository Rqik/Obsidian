import { useSelector } from 'react-redux';

import { selectAllNotes } from '../../store/notes.slice';
import CanvasConnection from '../CanvasConnection';
import DraggableNote from '../DraggableNote';
import styles from './CanvasView.module.scss';

const CanvasView = () => {
  const notes = useSelector(selectAllNotes);
  console.log(notes);

  return (
    <div className={styles.canvas}>
      <CanvasConnection />
      {notes.map((note) => (
        <DraggableNote key={note.id} note={note} />
      ))}
    </div>
  );
};

export default CanvasView;
