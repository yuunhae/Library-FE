type latLong = {
  lat1: number;
  long1: number;
  lat2: number;
  long2: number;
};
/**
 * 출발지, 도착지 각각의 위도 경도를 주면 직선거리를 계산해서 km 단위로 거리값 반환
 * @returns 직선거리 소수점 첫번 째 자리 값 
 */
const degToRad = (deg : number) => (deg * Math.PI) / 180; 
const clamp = (x: number) => Math.min(1,Math.max(-1,x));
export const getDistanceFromLatLonInKm = ({
  lat1,
  long1,
  lat2,
  long2,
}: latLong) => {
  // lat1: 출발지 위도, lng1:출발지 경도, lat2:도착지 위도, lat2:도착점 경도  
  const startLat = degToRad(lat1)
  const startLong = degToRad(long1)
  const desLat = degToRad(lat2)
  const desLong = degToRad(long2)
  
   const EARTH_RADIUS_KM = 6371.0088; //Earth radius
    const formula = Math.cos(startLat) * Math.cos(desLat) * Math.cos(desLong - startLong) +
          Math.sin(startLat) * Math.sin(desLat);

    const  calulateDistance = (EARTH_RADIUS_KM * Math.acos(clamp(formula)));  

   return Number(calulateDistance.toFixed(1));
};

