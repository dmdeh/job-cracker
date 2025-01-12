import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { TOPIC_MAP } from '../constants/topics';
import { getDeveloper } from '../utils/checkTopic';
import getTopicContents from '../utils/getTopicContents';

const useToggleSelection = (context: 'topics' | 'contents') => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);

  const developer = getDeveloper(searchParams.get('developer')) ?? 'Frontend';
  const developerTopics = TOPIC_MAP[developer];
  const allTopics = Object.keys(developerTopics);

  const topics = searchParams.get('topics')?.split(',') || [];
  const topicContents = getTopicContents(developerTopics, topics);

  const allSelected =
    context === 'topics'
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

  const toggleSelectItem = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return {
    developer,
    allTopics,
    topics,
    topicContents,
    selected,
    allSelected,
    notSelected,
    toggleSelectAll,
    toggleSelectItem,
  };
};

export default useToggleSelection;
