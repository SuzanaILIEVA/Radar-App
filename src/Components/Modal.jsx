import React, { useEffect, useState } from "react";
import { options } from "../constants";
import { useDispatch } from "react-redux";
import { setPath } from "../redux/Slices/flightSlice";
import formatDate from "../utils/formatDate";
import axios from "axios";

const Modal = ({ detailId, close }) => {
  console.log(detailId);
  const dispatch = useDispatch();

  // ucus detay verisini sadece bu sayafada kullanacagimiz icin store'da tutmaya gerek duymadik.
  const [d, setDetail] = useState(null);

  useEffect(() => {
    // onceki ucusun detaylarini sifirlar
    setDetail(null);

    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options
      )
      .then((res) => {
        // state'i guncelledik
        setDetail(res.data);

        // Harita sayfasinda kullanabilmek icin ucus yolunu slice'a aktardik
        dispatch(setPath(res.data.trail));
      });
  }, [detailId]);

  console.log(d);
  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <div className="close-wrapper">
          <button onClick={close} className="btnn rounded-3">
            X
          </button>
        </div>
        {!d ? (
          <div className="loader-wrapper">
            <div className="loader">
              <span></span>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2>{d.aircraft.model.text}</h2>
              <h2>{d.aircraft.model.code}</h2>

              <p>
                <span>Kuyruk Kodu : </span>
                <span>{d.aircraft.registration}</span>
              </p>

              {d.aircraft.images ? (
                <img
                  src={
                    d.aircraft.images?.large
                      ? d.aircraft.images?.large[0].src
                      : d.aircraft.images.thumbnails[0].src
                  }
                  alt=""
                />
              ) : (
                <p>Fotoğraf Bulunamadı </p>
              )}

              <p>
                <span>Şirket: </span>
                <span>{d.airline?.short}</span>
              </p>

              <p>
                <span>Kalkış:</span>
                <a href={d.airport?.origin?.website} target="_blank">
                  {d.airport?.origin?.name}
                </a>
              </p>

              <p>
                <span>İniş:</span>
                <a href={d.airport?.destination?.website} target="_blank">
                  {d.airport?.destination?.name}
                </a>
              </p>

              <p>
                <span>Kalkış Zamanı:</span>
                <span>
                  {d.time?.scheduled?.departure > 0
                    ? formatDate(d.time?.scheduled?.departure)
                    : "Bilinmiyor"}
                </span>
              </p>

              <p>
                <span>İniş Zamanı:</span>
                <span>
                  {d.time?.scheduled?.arrival > 0
                    ? formatDate(d.time?.scheduled?.arrival)
                    : "Bilinmiyor"}
                </span>
              </p>

              <p className={d.status?.icon}>
                <span>{d.status.text}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
