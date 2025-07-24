import { Button } from '@heroui/button';
import React, { useCallback, useContext, useState } from 'react';

import CanvasView from '../../components/CanvasView';
import Header, { type Mode } from '../../components/Header';
import Note from '../../components/Note';
import NoteList from '../../components/NoteList';
import ResizableGridLayout from '../../components/ResizableGridLayout/ResizableGridLayout';
import { useAppSelector } from '../../shared/hooks';
import { selectSelectedNoteId } from '../../store/notes.slice';
// import { useCrossTabSync } from '../shared/hooks/useCrossTabSync';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  // useCrossTabSync();
  const [activeMode, setActiveMode] = useState<Mode>('canvas');

  const [se, setState] = useState();
  const selectedNoteId = useAppSelector(selectSelectedNoteId);
  const s = useCallback(() => {
    console.log(se);
  }, []);

  return (
    <div className={styles.home}>
      <Button color="primary">Button</Button>;
      <Header activeMode={activeMode} onClickMode={setActiveMode} />
      <ResizableGridLayout
        sidebar={<NoteList />}
        content={
          <div className={styles.welcome}>
            <h1>Создать новый файл</h1>
            <p>Select a note from the sidebar to start editing, or create a new one.</p>
          </div>
        }
      />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <NoteList />
        </div>
        {activeMode === 'canvas' && <CanvasView />}
        {activeMode === 'diagram' && (
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
        )}
        {activeMode === 'editor' && (
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
        )}
      </div>
    </div>
  );
};

export default Home;
