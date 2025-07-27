import { useEffect, useMemo, useState } from "react";
import { getDistanceFromLatLonInKm } from "../utils/getDistanceFromLatLonInKm";
type libData = {
  libCode: string;
  libName: string;
  address: string;
  tel: string;
  operatingTime: string;
  homepage: string;
  latitude: number;
  longitude: number;
  isAvailable: boolean;
  returnDate: string;
};

type userLatLong = {
  latitude: number;
  longitude: number;
};
function useCalulateDistance(data: libData[]) {
  const [userLocation, setUserLocation] = useState<userLatLong>();
  const [error, setError] = useState<GeolocationPositionError>();

 //사용자 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("fjs");
      
      return;
      
    }
    navigator.geolocation.getCurrentPosition(
      
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });        
      },
      (err) => {
        setError(err); //에러코드 1번만 핸들링중
        console.error(err);
      }
    );
  }, []);  
  

  //계산하고 거리 정보랑 기존 도서관 데이터랑 합치기
  const libWithDistance = useMemo(() => {
    if (!userLocation) return [];
    return data
      .map((lib) => ({
        ...lib,
        distance: getDistanceFromLatLonInKm({
          lat1: userLocation.latitude,
          long1: userLocation.longitude,
          lat2: lib.latitude,
          long2: lib.longitude,
        }),
      }))

      .sort((a, b) => a.distance - b.distance);
  }, [data, userLocation]);
  

  return {
    libWithDistance,
    userLocation,
    error,
  };
}
export default useCalulateDistance;
