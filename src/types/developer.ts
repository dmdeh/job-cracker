export type DeveloperKey = 'Frontend' | 'Backend' | 'iOS';
export type DeveloperType = `${DeveloperKey} Developer`;

export type DeveloperInfo = {
  type: DeveloperType;
  description: string;
  topics: string[];
};
