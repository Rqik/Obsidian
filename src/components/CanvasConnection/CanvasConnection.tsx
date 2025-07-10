import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectAllNotes } from '../../store/notes.slice';
import { findClosestPoints } from './untils';

interface Point {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function CanvasConnection() {
  const notes = useSelector(selectAllNotes);
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(null);

  const updatePositions = () => {
    const next: Record<string, Point> = {};
    notes.forEach((note) => {
      const el = document.getElementById(`note-${note.id}`);
      const containerRect = containerRef.current?.getBoundingClientRect();
      const rect = el?.getBoundingClientRect();

      if (rect && containerRect) {
        next[note.id] = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      }
    });
    setPositions(next);
    animationFrameRef.current = requestAnimationFrame(updatePositions);
  };

  useEffect(() => {
    updatePositions();
    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
    };
  }, [notes]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
          </marker>
        </defs>

        {notes.map((source) =>
          source.linkedNotes.map((targetId) => {
            const from = positions[source.id];
            const to = positions[targetId];
            if (!from || !to) return null;

            const fromBox = positions[source.id];
            const toBox = positions[targetId];
            if (!fromBox || !toBox) return null;

            // const dx = to.x - from.x;
            // const dy = to.y - from.y;
            // const angle = Math.atan2(dy, dx);

            // // const shortenStart = Math.min(fromBox.width, fromBox.height) / 2;
            // // const shortenEnd = Math.min(toBox.width, toBox.height) / 2;

            // const fromOffsetX = (fromBox.width / 2) * Math.cos(angle);
            // const fromOffsetY = (fromBox.height / 2) * Math.sin(angle);
            // const toOffsetX = (toBox.width / 2) * Math.cos(angle);
            // const toOffsetY = (toBox.height / 2) * Math.sin(angle);

            // // const x1 = fromBox.x + Math.cos(angle) * shortenStart;
            // // const y1 = fromBox.y + Math.sin(angle) * shortenStart;
            // // const x2 = toBox.x - Math.cos(angle) * shortenEnd;
            // // const y2 = toBox.y - Math.sin(angle) * shortenEnd;
            // const x1 = from.x + fromOffsetX;
            // const y1 = from.y + fromOffsetY;
            // const x2 = to.x - toOffsetX;
            // const y2 = to.y - toOffsetY;

            // const fromPoint = intersectRectEdge(toBox, fromBox, fromBox, -180); // откуда
            // const toPoint = intersectRectEdge(fromBox, toBox, toBox, 8); // куда

            // const fromEdge = getClosestEdgePoint(toBox, fromBox); // точка на внешней грани from
            // const toEdge = getClosestEdgePoint(fromBox, toBox); // точка на внешней грани to

            const [startPoint, endPoint] = findClosestPoints(fromBox, toBox, 8);
            return (
              <line
                key={`${source.id}-${targetId}`}
                x1={startPoint.x}
                y1={startPoint.y}
                x2={endPoint.x}
                y2={endPoint.y}
                stroke="#888"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}
