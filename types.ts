
export enum ActivityType {
  SIGHTSEEING = 'Sightseeing',
  FOOD = 'Food & Dining',
  ADVENTURE = 'Adventure',
  RELAXATION = 'Relaxation',
  CULTURE = 'Culture',
  TRANSPORT = 'Transport',
  ACCOMMODATION = 'Stay'
}

export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  cost: number;
  startTime: string;
  duration: string;
  description: string;
}

export interface Stop {
  id: string;
  cityId: string;
  cityName: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  coverImage: string;
  isPublic: boolean;
  stops: Stop[];
}

export interface CityInfo {
  id: string;
  name: string;
  country: string;
  costIndex: 'Low' | 'Medium' | 'High';
  popularity: number;
  description: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  preferences: {
    language: string;
    currency: string;
  };
}
