import { useEffect, useState } from "react";
import Header from "./Components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/Actions";
import Modal from "./Components/Modal";

function App() {
  //harita gorunumu aktif mi?
  const [isMapView, setIsMapView] = useState(true);
  const [detailId, setDetailId] = useState(null); // detayi gosterilecek elemanin id'sini state'te tutuyoruz
  // console.log(detailId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlights());
  }, []);

  return (
    <>
      <Header />

      <div className="view-buttons">
        <button
          onClick={() => setIsMapView(true)}
          className={isMapView ? "active" : ""}
        >
          Harita Görünümü
        </button>
        <button
          onClick={() => setIsMapView(false)}
          className={isMapView ? "" : "active"}
        >
          Liste Görünümü
        </button>
      </div>

      {isMapView ? (
        <MapView setDetailId={setDetailId} />
      ) : (
        <ListView setDetailId={setDetailId} />
      )}

      {detailId && (
        <Modal detailId={detailId} close={() => setDetailId(null)} />
      )}
    </>
  );
}

export default App;
