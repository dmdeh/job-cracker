import { TOPIC_MAP } from '@/constants/topics';

export type DeveloperKey = keyof typeof TOPIC_MAP;
export type DeveloperType = `${DeveloperKey} Developer`;

export type DeveloperInfo = {
  type: DeveloperType;
  description: string;
  topics: string[];
};
