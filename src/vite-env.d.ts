/// <reference types="vite/client" />

declare global {
  interface Window {
    kakao: any;
  }
}

declare namespace kakao.maps {
  class Map {
    constructor(container: HTMLElement, options: any);
    setCenter(latlng: LatLng): void;
    setBounds(bounds : kakao.maps.LatLngBounds) : void;
  }
  
  class LatLng {
    constructor(lat: number, lng: number);
  }
  
  class Marker {
    constructor(options: any);
    setMap(map: Map | null): void;
    getTitle() : void;
  }
  
  function load(callback: () => void): void;
}
