export type GetLibListResponse = {
    content : [
    {
      libCode: string,
      libName: string,
      address: string,
      tel: string,
      operatingTime: string,
      homepage: string,
      latitude: number,
      longitude: number,
      isAvailable: boolean,
      returnDate: string
    }
    ]
}