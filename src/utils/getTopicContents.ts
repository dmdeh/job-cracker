import { TopicKey } from '@/types/developerType';

function getTopicContents(topics: TopicKey, selectedContents: string[]) {
  return Object.entries(topics).reduce<string[]>((acc, [key, value]) => {
    if (selectedContents.includes(key)) {
      return acc.concat(value);
    }
    return acc;
  }, []);
}

export default getTopicContents;
