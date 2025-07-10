import { useState } from 'react';

import { Button } from '../Button';
import styles from './Header.module.scss';

export type Mode = 'canvas' | 'diagram' | 'editor';

type SelectProp = {
  id: Mode;
  label: string;
};

const MODES: SelectProp[] = [
  { id: 'canvas', label: 'Холст' },
  { id: 'diagram', label: 'Диаграмма' },
  { id: 'editor', label: 'Редактор' },
];

type Props = {
  activeMode: Mode;
  onClickMode: (id: Mode) => void;
};

const Header = ({ activeMode = 'canvas', onClickMode }: Props) => (
  <div className={styles.header}>
    {MODES.map(({ id, label }) => (
      <Button key={id} variant={activeMode === id ? 'active' : 'edit'} onClick={() => onClickMode(id)}>
        {label}
      </Button>
    ))}
  </div>
);

export default Header;
