export interface Business {
  _id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  businessId: string;
  createdAt: string;
}
