export const create3dGrid = (maxX, maxY, maxZ) => {
  const points = [];
  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      for (let z = 0; z < maxZ; z++) {
        const u = maxX <= 1 ? 0 : x / (maxX - 1);
        const v = maxY <= 1 ? 0 : y / (maxY - 1);
        const w = maxZ <= 1 ? 0 : z / (maxZ - 1);
        points.push({
          position: [u, v, w],
        });
      }
    }
  }

  return points;
};
