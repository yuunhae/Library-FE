import { useEffect, useMemo, useState } from "react";
import { getDistanceFromLatLonInKm } from "../utils/getDistanceFromLatLonInKm";
export type LibraryDataProps = {
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
  distance?: number;
};

type userLatLong = {
  latitude: number;
  longitude: number;
};

function useCalulateDistance(data: LibraryDataProps[]) {
  const [userLocation, setUserLocation] = useState<userLatLong>();
  const [error, setError] = useState<GeolocationPositionError>();

  //사용자 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
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
        setError(err); //에러코드 1번만 핸들링중 : 사용자 위치 권한 거부
        console.error(err);
      }
    );
  }, []);

  //계산하고 거리 정보추가한 새로운 배열 생성
  const LibraryData = useMemo(() => {
    if (error || !userLocation){
       return data;
    }

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
  }, [error, data, userLocation]);

  return {
    LibraryData,
    userLocation,
    error,
  };
}
export default useCalulateDistance;
