import developers from '@/constants/developer';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDeveloper } from '../utils/checkTopic';
import getTopicContents from '../utils/getTopicContents';

const useToggleSelection = (context: 'topics' | 'contents') => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);
  const [topicContents, setTopicContents] = useState<string[]>([]);

  const developerParam = searchParams.get('developer');

  const developer = getDeveloper(developerParam, context) ?? 'Frontend';
  const developerTopics = developers[developer].topics;
  const allTopics = Object.keys(developerTopics);

  const topics = searchParams.get('topics')?.split(',') || [];

  useEffect(() => {
    const contents = getTopicContents(developerTopics, topics);
    setTopicContents(contents);
  }, [searchParams]);

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
