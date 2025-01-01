export const randomInt = ({
  min = 0,
  max = 100,
}: { min?: number; max?: number } = {}) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomIndices = ({
  length,
  max,
}: {
  length: number;
  max: number;
}) => {
  const indices = new Set<number>();

  while (indices.size < length) {
    indices.add(randomInt({ max }));
  }

  return Array.from(indices);
};
