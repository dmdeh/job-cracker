import developers, { DeveloperTypes, TYPE_TO_KEY } from '@/constants/developer';
import { DeveloperKey } from '@/constants/topics';

function isDeveloper(value: string | null): value is DeveloperTypes {
  if (!value) return false;
  return Object.values(developers).some((dev) => dev.type === value);
}

export function getDeveloper(value: string | null): DeveloperKey | null {
  if (!isDeveloper(value)) return null;
  return TYPE_TO_KEY[value as DeveloperTypes];
}
