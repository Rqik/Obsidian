//рисует линию из центра в центр
export function getClosestEdgePoint(
  from: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number },
): { x: number; y: number } {
  const left = rect.x - rect.width / 2;
  const right = rect.x + rect.width / 2;
  const top = rect.y - rect.height / 2;
  const bottom = rect.y + rect.height / 2;

  const dx = from.x - rect.x;
  const dy = from.y - rect.y;

  const absDX = Math.abs(dx);
  const absDY = Math.abs(dy);

  if (absDX > absDY) {
    // Левый или правый край
    return {
      x: dx > 0 ? right : left,
      y: rect.y,
    };
  }

  // Верхний или нижний край
  return {
    x: rect.x,
    y: dy > 0 ? bottom : top,
  };
}

function intersectRectEdge(
  from: { x: number; y: number },
  to: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number },
) {
  const center = { x: rect.x, y: rect.y };
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const halfWidth = rect.width / 2;
  const halfHeight = rect.height / 2;

  const absDX = Math.abs(dx);
  const absDY = Math.abs(dy);

  let scale;
  if (absDX / halfWidth > absDY / halfHeight) {
    // Пересекает по горизонтали
    scale = halfWidth / absDX;
  } else {
    // Пересекает по вертикали
    scale = halfHeight / absDY;
  }

  return {
    x: center.x + dx * scale,
    y: center.y + dy * scale,
  };
}

function getPerimeterPoints(rect: Rect, pointsCount = 100): Point[] {
  const { x, y, width, height } = rect;
  const halfW = width / 2;
  const halfH = height / 2;

  const topLeft = { x: x - halfW, y: y - halfH };
  const topRight = { x: x + halfW, y: y - halfH };
  const bottomRight = { x: x + halfW, y: y + halfH };
  const bottomLeft = { x: x - halfW, y: y + halfH };

  const points: Point[] = [];

  const perimeter = 2 * (width + height);
  const step = perimeter / pointsCount;

  // По сторонам: топ, право, низ, лево — равномерно набираем точки
  for (let dist = 0; dist < perimeter; dist += step) {
    if (dist < width) {
      // верхняя сторона
      points.push({ x: topLeft.x + dist, y: topLeft.y });
    } else if (dist < width + height) {
      // правая сторона
      points.push({ x: topRight.x, y: topRight.y + (dist - width) });
    } else if (dist < 2 * width + height) {
      // нижняя сторона
      points.push({ x: bottomRight.x - (dist - width - height), y: bottomRight.y });
    } else {
      // левая сторона
      points.push({ x: bottomLeft.x, y: bottomLeft.y - (dist - 2 * width - height) });
    }
  }

  return points;
}

type Point = { x: number; y: number };
type Rect = { x: number; y: number; width: number; height: number };

export function findClosestPoints(rectA: Rect, rectB: Rect, pointsCount = 2): [Point, Point] {
  const pointsA = getPerimeterPoints(rectA, pointsCount);
  const pointsB = getPerimeterPoints(rectB, pointsCount);

  let minDist = Infinity;
  let pair: [Point, Point] = [pointsA[0], pointsB[0]];

  for (const pA of pointsA) {
    for (const pB of pointsB) {
      const dx = pA.x - pB.x;
      const dy = pA.y - pB.y;
      const dist = dx * dx + dy * dy; // квадрат расстояния для оптимизации
      if (dist < minDist) {
        minDist = dist;
        pair = [pA, pB];
      }
    }
  }

  return pair;
}
