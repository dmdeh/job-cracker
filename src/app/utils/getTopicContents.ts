import { TOPIC_MAP, TopicKey } from "@/app/constants/topics";

function getTopicContents(
  topics: (typeof TOPIC_MAP)[TopicKey],
  selectedContents: string[]
) {
  return Object.entries(topics)
    .filter(([key]) => selectedContents.includes(key))
    .reduce<string[]>((acc, [_, value]) => {
      return [...acc, ...value];
    }, []);
}
export default getTopicContents;
