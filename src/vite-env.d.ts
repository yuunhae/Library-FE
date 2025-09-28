/// <reference types="vite/client" />

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

declare namespace kakao.maps {
  class Map {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(container: HTMLElement, options: any);
    setCenter(latlng: LatLng): void;
    setBounds(bounds : kakao.maps.LatLngBounds) : void;
  }
  
  class LatLng {
    constructor(lat: number, lng: number);
  }
  
  class Marker {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(options: any);
    setMap(map: Map | null): void;
    getTitle() : void;
  }
  
  function load(callback: () => void): void;
}
