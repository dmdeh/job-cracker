import developers, { TYPE_TO_KEY } from '@/constants/developer';
import { DeveloperKey, DeveloperType } from '@/types/developer';

export const isDeveloperType = (value: string | null): value is DeveloperType =>
  value != null && Object.values(developers).some((dev) => dev.type === value);

export const isDeveloper = (value: string | null): value is DeveloperKey =>
  value != null && Object.keys(developers).includes(value);

/**
 *
 * @param value - 개발자 타입 문자열 (DeveloperKey 또는 DeveloperType)
 * @param context - 'topics': 'Frontend Developer' -> 'Frontend'
 *                  'contents': 'Frontend' -> 'Frontend'
 */
export const getDeveloper = (
  value: string | null,
  context: 'topics' | 'contents' = 'topics'
): DeveloperKey | null => {
  if (!value) return null;

  if (context === 'contents') {
    return isDeveloper(value) ? value : null;
  }

  if (!isDeveloperType(value)) return null;
  return TYPE_TO_KEY[value as DeveloperType];
};
