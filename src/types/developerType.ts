import developers from '@/constants/developer';

export type DeveloperInfo = typeof developers;

export type DeveloperKey = keyof DeveloperInfo;

export type DeveloperDetail = {
  type: DeveloperInfo[DeveloperKey]['type'];
  description: string;
  topics: string[];
};

export type DeveloperTypeMap = {
  [K in DeveloperDetail['type']]: DeveloperKey;
};
