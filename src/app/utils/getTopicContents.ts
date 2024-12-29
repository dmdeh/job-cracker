import { ContentsKey } from "@/app/constants/topics";

function getTopicContents(topics: ContentsKey, selectedContents: string[]) {
  return Object.entries(topics).reduce<string[]>((acc, [key, value]) => {
    if (selectedContents.includes(key)) {
      return acc.concat(value);
    }
    return acc;
  }, []);
}

export default getTopicContents;
