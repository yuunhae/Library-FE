import { useEffect, useState } from "react";
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
        console.error("위치 정보 가져오기 실패:", err.message);
      }
    );
  }, []);

  //계산하고 거리 정보랑 기존 도서관 데이터랑 합치기
    if(userLocation && data) {
     return data.map((lib) => ({
      ...lib,
      distance: getDistanceFromLatLonInKm({
        lat1: userLocation.latitude,
        long1: userLocation.longitude,
        lat2: lib.latitude,
        long2: lib.longitude,
      }),
    }
    ))
  .sort((a, b) => a.distance - b.distance)
  }

  }

export default useCalulateDistance;
