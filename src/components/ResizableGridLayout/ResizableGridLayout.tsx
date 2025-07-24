import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import styles from './ResizableGridLayout.module.scss';

interface Props {
  sidebar: ReactNode;
  content: ReactNode;
  storageKey?: string;
  minSidebarRatio?: number;
  maxSidebarRatio?: number;
}

const DEFAULT_RATIO = 0.25;
const count = 2;

const ResizableGridLayout = ({
  sidebar,
  content,
  storageKey = 'sidebarRatio',
  minSidebarRatio = 0.2,
  maxSidebarRatio = 0.5,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sidebarRatio, setSidebarRatio] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseFloat(saved) : DEFAULT_RATIO;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, sidebarRatio.toString());
  }, [sidebarRatio]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const startX = e.clientX;
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.getBoundingClientRect().width;
      const startRatio = sidebarRatio;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX;
        const deltaRatio = delta / containerWidth;
        const newRatio = Math.max(minSidebarRatio, Math.min(maxSidebarRatio, startRatio + deltaRatio));
        setSidebarRatio(newRatio);
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [sidebarRatio],
  );

  const gridStyle = {
    display: 'grid',
    height: '100vh',
    gridTemplateColumns: `${sidebarRatio * 100}% 4px 1fr`,
  };

  return (
    <div ref={containerRef} style={gridStyle}>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.resizer} onMouseDown={handleMouseDown} />
      <div className={styles.content}>
        <Dropdown >
          <DropdownTrigger>
            <Button variant="bordered">Open Menu</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {content}
      </div>
    </div>
  );
};

export default ResizableGridLayout;
