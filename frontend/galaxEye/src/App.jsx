import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import "./index.css";
function App() {
  return (
    <div className="bg-zinc-100 h-[100vh] ">
      <h1 className="text-xl font-bold text-green-950 text-center leading-none py-2">
        GalaxEye
      </h1>
      <div className="h-[94vh] w-auto bg-zinc-400 p-5 flex gap-4">
        <div className="bg-stone-50 w-[50vw]">
          <Sidebar />
        </div>
        <div className="bg-green-200 w-[100%] z-0">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
/* <div className="h-screen p-5 ">
      <h2 className="text-xl font-sans font-bold text-center text-green-800 pb-2">
        GalaxEye Assignment
      </h2>
      <div>
        <Sidebar />

        <Map />
      </div>
    </div> */
