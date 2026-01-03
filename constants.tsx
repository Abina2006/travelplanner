
import { CityInfo, ActivityType } from './types';

export const MOCK_CITIES: CityInfo[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    costIndex: 'High',
    popularity: 98,
    description: 'The city of light, famous for its cafe culture and landmarks.',
    image: 'https://picsum.photos/seed/paris/800/600'
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    costIndex: 'Medium',
    popularity: 95,
    description: 'A neon-lit metropolis blending tradition with futuristic tech.',
    image: 'https://picsum.photos/seed/tokyo/800/600'
  },
  {
    id: '3',
    name: 'New York',
    country: 'USA',
    costIndex: 'High',
    popularity: 97,
    description: 'The Big Apple, a global center of finance, culture, and art.',
    image: 'https://picsum.photos/seed/nyc/800/600'
  }
];

export const ACTIVITY_CATEGORIES = Object.values(ActivityType);
