import { DeveloperKey, TOPIC_MAP } from '../constants/topics';

function isDeveloper(value: string | null): value is DeveloperKey {
  return value !== null && Object.keys(TOPIC_MAP).includes(value);
}

export function getDeveloper(value: string | null): DeveloperKey | null {
  if (isDeveloper(value)) {
    return value;
  }
  return null;
}
