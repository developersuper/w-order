export interface PlaceResponseType {
    id: string;
    name: string;
    url: string;
    createdDate: Date;
    qrCode: string;
    shortUrl: string;
    menuItemCount: number | string,
    categoryCount: number | string
} 

export interface PlacePayloadType {
    placeName: string;
    placeUrl: string;
}