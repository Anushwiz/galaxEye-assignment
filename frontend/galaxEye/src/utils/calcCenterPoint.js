function calcCenterPoint(coordinates) {
  const centerLat =
    coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length;
  const centerLng =
    coordinates.reduce((sum, coord) => sum + coord[0], 0) / coordinates.length;

  return [centerLat, centerLng];
}

export default calcCenterPoint;
