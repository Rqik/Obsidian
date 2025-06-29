import React, { useCallback, useContext, useState } from 'react';

import Note from '../../components/Note';
import NoteList from '../../components/NoteList';
import { useAppSelector } from '../../shared/hooks';
import { selectSelectedNoteId } from '../../store/notes.slice';
// import { useCrossTabSync } from '../shared/hooks/useCrossTabSync';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  // useCrossTabSync();
  const [se, setState] = useState();
  const selectedNoteId = useAppSelector(selectSelectedNoteId);
  const s = useCallback(() => {
    console.log(se);
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.sidebar}>
        <NoteList />
      </div>
      <div className={styles.main}>
        {selectedNoteId ? (
          <Note noteId={selectedNoteId} />
        ) : (
          <div className={styles.welcome}>
            <h1>Welcome to your Notes</h1>
            <p>Select a note from the sidebar to start editing, or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
