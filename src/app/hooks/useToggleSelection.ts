import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getTopic } from "../utils/checkTopic";
import { TOPIC_MAP } from "../constants/topics";
import getTopicContents from "../utils/getTopicContents";

const useToggleSelection = (context: "topics" | "contents") => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);

  const topic = getTopic(searchParams.get("topic")) ?? "Frontend";
  const selectedTopics = TOPIC_MAP[topic];
  const allTopics = Object.keys(selectedTopics);

  const contents = searchParams.get("selected")?.split(",") || [];
  const topicContents = getTopicContents(selectedTopics, contents);

  const allSelected =
    context === "topics"
      ? selected.length === allTopics.length
      : selected.length === topicContents.length;
  const notSelected = selected.length === 0;

  const toggleSelectAll = (items: string[]) => {
    if (allSelected) {
      setSelected([]);
      return;
    } else {
      setSelected(items);
    }
  };

  const toggleSelectTopic = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return {
    topic,
    allTopics,
    topicContents,
    selected,
    allSelected,
    notSelected,
    toggleSelectAll,
    toggleSelectTopic,
  };
};

export default useToggleSelection;
