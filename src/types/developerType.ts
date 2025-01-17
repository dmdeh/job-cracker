import developers from '@/constants/developer';

export type DeveloperInfo = typeof developers;

export type DeveloperKey = keyof DeveloperInfo;

export type DeveloperDetail = {
  type: DeveloperInfo[DeveloperKey]['type'];
  description: string;
  topics: string[];
};

export type DeveloperType = DeveloperDetail['type'];

export type TopicKey = (typeof developers)[DeveloperKey]['topics'];

export type DeveloperTypeMap = {
  [K in DeveloperDetail['type']]: DeveloperKey;
};
