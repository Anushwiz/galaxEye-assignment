/* eslint-disable react/prop-types */
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
  Popup,
  /* useMap, */
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";
import calcCenterPoint from "../utils/calcCenterPoint";
import { useMapApi } from "../services/useMapApi";
import { useGeolocation } from "../services/useGeoLocation";
import Loader from "./Loader";

// function ClickHandler({ onClick }) {
//   const map = useMap();

//   useEffect(() => {
//     const handleClick = (e) => {
//       onClick(e); // Call the parent click handler
//     };

//     map.on("click", handleClick);
//     return () => {
//       map.off("click", handleClick); // Cleanup on unmount
//     };
//   }, [map, onClick]);

//   return null; // This component doesn't render anything
// }

function Map() {
  const [intersectingTiles, setIntersectionTiles] = useState([]);
  const [popup, setPopup] = useState(null);
  const [popupPosition, setPopupPosition] = useState([]);
  const mapRef = useRef();
  const mapRef2 = useRef();
  const { tilesLoaded } = useMapApi();
  const [mapPosition, setMapPosition] = useState([12.9716, 77.5946]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition) {
        setMapPosition(geolocationPosition);
        mapRef2?.current?.setView(geolocationPosition, 10);
      }
    },
    [geolocationPosition]
  );

  // const handleCreate = (e) => {
  //   const { layer } = e;
  //   console.log(e);
  //   const aoi = layer.toGeoJSON();
  //   console.log(aoi);
  //   /* console.log(aoi); */
  //   console.log(jsonData);
  //   if (jsonData) {
  //     const isOutsideKarnataka = jsonData.every((tile) =>
  //       turf.booleanDisjoint(tile.geometry, aoi.geometry)
  //     );

  //     if (isOutsideKarnataka) {
  //       setPopup(
  //         "You have drawn polygon outside Karnataka!..Please draw inside Karnataka"
  //       );
  //       const aoiCoords = aoi.geometry.coordinates[0];
  //       console.log(aoiCoords);
  //       const centerLat =
  //         aoiCoords.reduce((sum, coord) => sum + coord[1], 0) /
  //         aoiCoords.length;
  //       const centerLng =
  //         aoiCoords.reduce((sum, coord) => sum + coord[0], 0) /
  //         aoiCoords.length;
  //       console.log(centerLat, centerLng);
  //       setPopupPosition([centerLat, centerLng]);
  //     } else {
  //       const newIntersectingTiles = jsonData.filter((tile) =>
  //         turf.booleanIntersects(tile.geometry, aoi.geometry)
  //       );
  //       setIntersectionTiles((intersectingTiles) => [
  //         ...intersectingTiles,
  //         ...newIntersectingTiles,
  //       ]);
  //       const numberOfIntersection = newIntersectingTiles.length;
  //       console.log(newIntersectingTiles);
  //       console.log(numberOfIntersection);

  //       setPopup(`your polygon is intersecting ${numberOfIntersection} tiles`);
  //       const aoiCoords = aoi.geometry.coordinates[0];
  //       console.log(aoiCoords);
  //       const centerLat =
  //         aoiCoords.reduce((sum, coord) => sum + coord[1], 0) /
  //         aoiCoords.length;
  //       const centerLng =
  //         aoiCoords.reduce((sum, coord) => sum + coord[0], 0) /
  //         aoiCoords.length;
  //       console.log(centerLat, centerLng);
  //       setPopupPosition([centerLat, centerLng]);
  //     }
  //   }
  // };
  async function findIntersection(aoi) {
    try {
      const response = await axios.post("http://localhost:5000/api/aoi", aoi);
      const newIntersectingTiles = response.data;
      /* Checking whether we have intersecting data if not show popup with message*/
      if (newIntersectingTiles.length > 0) {
        setIntersectionTiles((intersectingTiles) => [
          ...intersectingTiles,
          ...newIntersectingTiles,
        ]);
        setPopup(
          `Your polygon is intersecting ${newIntersectingTiles.length} tiles`
        );
      } else {
        setPopup(
          "Your polygon does not intersect with any tiles. please draw inside Karnataka"
        );
      }

      /* Calculate center for popup positioning */
      const aoiCoords = aoi.geometry.coordinates[0];
      const [centerLat, centerLng] = calcCenterPoint(aoiCoords);
      setPopupPosition([centerLat, centerLng]);
    } catch (error) {
      console.error("Error fetching intersecting tiles:", error);
      setPopup(
        "There was an error checking the intersection. Please try again."
      );
    }
  }

  async function handleCreate(e) {
    const { layer } = e;
    /* converting layer data to geoJSON format by inbuilt method on layer object */
    const aoi = layer.toGeoJSON();
    // console.log("AOI Data for Postman:", JSON.stringify(aoi, null, 3));

    await findIntersection(aoi);
  }

  async function handleEdit(e) {
    console.log(e);
    const editedLayer = e.layers.getLayers()[0];

    console.log(editedLayer);
    if (editedLayer) {
      const editedAoi = editedLayer.toGeoJSON();

      await findIntersection(editedAoi);
    }
  }

  function handleClearMap() {
    setIntersectionTiles([]);
    setPopup(null);
    mapRef.current.clearLayers();
  }
  // function handleClick(e) {
  //   console.log("Map clicked at:", e.latlng);
  // }
  return (
    <>
      {isLoadingPosition ? (
        <Loader />
      ) : (
        <MapContainer
          center={mapPosition}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "auto" }}
          /* className="h-[100%] w-auto" */
          ref={mapRef2}
        >
          {/* https://leaflet-extras.github.io/leaflet-providers/preview/index.html */}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /* https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg */
          />
          <FeatureGroup ref={mapRef}>
            {tilesLoaded && (
              <EditControl
                position="topleft"
                onCreated={handleCreate}
                onEdited={handleEdit}
                draw={{
                  rectangle: false,
                  circle: false,
                  marker: false,
                  circlemarker: false,
                  polyline: false,
                }}
              />
            )}
          </FeatureGroup>
          {intersectingTiles.length > 0 &&
            intersectingTiles.map((tile, index) => (
              <Polygon
                key={index}
                pathOptions={{ color: "red", fill: "rgba(255,0,0,0.2)" }}
                positions={tile.geometry.coordinates[0].map(([lng, lat]) => [
                  lat,
                  lng,
                ])}
              />
            ))}

          {popup && (
            <Popup position={popupPosition} key={popup}>
              {popup}
            </Popup>
          )}
          {/*   <ClickHandler onClick={handleClick} /> */}
        </MapContainer>
      )}
      <div className="absolute bottom-0 left-[11vw] flex mb-[5vh] items-center space-x-2">
        <button
          onClick={handleClearMap}
          className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg z-1000"
        >
          Clear Map
        </button>

        <button
          onClick={getPosition}
          className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg z-1000"
        >
          {isLoadingPosition ? "loading..." : "My position"}
        </button>
      </div>
    </>
  );
}

export default Map;
