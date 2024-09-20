function Sidebar() {
  return (
    <div className="p-2">
      <h1 className="font-bold text-sky-600 text-center mb-2">
        Instructions for using GalaxEye
      </h1>
      <ul className="text-sm font-semibold text-stone-800 list-decimal ml-6 mx-4 space-y-3">
        <li>
          Click on the ploygon icon from left option menu for drawing any
          polygon
        </li>
        <li>
          Draw any polygon of any shape triangle,rectangle etc of your wish
          inside the <b>Karnataka</b>
        </li>
        <li>
          After drawing the polygon the tiles covered on karnataka which are
          intersecting with our polygon will be highlighted
        </li>
        <li>
          The polygon we draw will be of color blue & the red color shapes which
          appears after we finsih drawing is the intersecting tiles with our
          nlue polygons{" "}
        </li>
        <li>
          We can even edit the drwan polygon by using edit option & moving the
          nodes of the shape by cursor then the polygon will be updated
        </li>
        <li>
          if we have new intersecting tiles then that will shown on map aswell
        </li>
        <li>
          To clear everything on the map please click on the clear map button in
          the bottom{" "}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
