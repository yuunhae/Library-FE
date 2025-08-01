import { useEffect, useRef, useState } from "react";
import { useFetchLibListQuery } from "../../../../../api/bookDetail/libraryList/useFetchLibList";
import useCalulateDistance from "../../../../../hooks/useCalulateDistance";
import LocationSvg from "../../../../../asset/current-location-svgrepo-com.svg";
type LibraryMapProps = {
  isbn: string;
};
function LibraryMap({ isbn }: LibraryMapProps) {
  const { data } = useFetchLibListQuery(isbn);
  const { userLocation, error } = useCalulateDistance(data);

  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();
  const [userCurrentLocMarker, setUserCurrentLocMarker] =
    useState<kakao.maps.Marker | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  const showCurrentLocation = (kakaoMap: kakao.maps.Map) => {
    if (userCurrentLocMarker) {
      userCurrentLocMarker.setMap(null);
      setUserCurrentLocMarker(null);
    }

    if (!isKakaoMapLoaded || !userLocation) return;

    if (userLocation && isKakaoMapLoaded && !userCurrentLocMarker) {
      const marker = new window.kakao.maps.Marker({
        map: kakaoMap,
        position: new window.kakao.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        ),
      });

      marker.setMap(kakaoMap);
      setUserCurrentLocMarker(marker);
      kakaoMap.setCenter(
        new window.kakao.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        )
      );
    }
  };

  useEffect(() => {
    const script = document.createElement("script");

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapContainer.current) return;

        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.497545, 127.002907), // 지도의 중심좌표 :  국립중앙도서관 좌표
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);
        setKakaoMap(map);
        setIsKakaoMapLoaded(true);
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
    <div className="lg:w-full xs:w-full h-[600px] bg-gray-100">
      <div ref={mapContainer} id="map" className="w-full h-full relative">
        {error ? (
          <p className="absolute bottom-7 left-4  w-auto h-6 shadow-sm bg-white rounded flex items-center justify-center z-10">
            브라우저 설정에서 위치 권한을 허용해주세요
          </p>
        ) : (
          <button
            type="button"
            onClick={() => kakaoMap && showCurrentLocation(kakaoMap)}
            className="absolute bottom-3 left-4 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 shadow-sm transition-colors  bg-white rounded flex items-center justify-center z-10 hover:bg-slate-200"
          >
            <img src={LocationSvg} alt="location-icon" className="w-4 h-4 " />
          </button>
        )}
      </div>
    </div>
  );
}

export default LibraryMap;
