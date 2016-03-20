export function isCorner(index, level) {
  return isCenterCell(index, level) ? true : index % level === 0;
}

export function isCenterCell(index, level) {
  return (index === 0 && level === 0);
}

export function getTopLeft(index, level) {
  return isCorner(index, level) ?
    getSiblingLeft(getTop(index, level), level + 1) :
    index + Math.floor(index / level);
}

export function getTopRight(index, level) {
  return isCorner(index, level) ?
  getSiblingRight(getTop(index, level), level + 1) :
    index + Math.floor(index / level) + 1;
}

export function getTop(index, level) {
  return isCenterCell(index, level) ? 0 : index + (index / level);
}

export function getSiblingLeft(index, level) {
  const levelLength = getLevelLength(level);
  return isCenterCell(index, level) ? 4 : (index - 1 < 0) ? levelLength - 1 : index - 1;
}

export function getSiblingRight(index, level) {
  const levelLength = getLevelLength(level);
  return isCenterCell(index, level) ? 2 : (index + 1 >= levelLength) ? 0 : index + 1;
}

export function getBottomLeft(index, level) {
  return index - (Math.floor(index / level)) - 1;
}

export function getBottomRight(index, level) {
  return getSiblingRight(getBottomLeft(index, level), level - 1);
}

export function getBottom(index, level) {
  return isCenterCell(index, level) ? 3 : index - (index / level);
}

export function getLevelLength(level) {
  // level 0 has length of 1, all other levels have level * 6 length
  return level ? level * 6 : 1;
}
