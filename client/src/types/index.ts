export interface Coordinates {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Business {
  _id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  coordinates?: Coordinates;
  createdAt: string;
}

export interface BusinessCreate {
  name: string;
  description: string;
  category: string;
  location: string;
  coordinates?: Coordinates;
}

export interface LocationFilter {
  lat: number;
  lng: number;
  radius: number; // in kilometers
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  businessId: string;
  createdAt: string;
}
