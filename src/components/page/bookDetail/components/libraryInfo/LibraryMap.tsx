import { useEffect } from "react";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

function LibraryMap() {
  useEffect(() => {
    const script = document.createElement("script");

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        if (!mapContainer) return;

        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.497545, 127.002907), // 지도의 중심좌표
          level: 3,
        };
        new window.kakao.maps.Map(mapContainer, mapOptions);
      });
    };
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="lg:w-full sm:w-[307px] h-[600px] bg-gray-100">
      <div id="map" className="w-full h-full" />
    </div>
  );
}

export default LibraryMap;
