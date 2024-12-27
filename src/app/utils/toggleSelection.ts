export function toggleSelectAll<T>(
  isAllSelected: boolean,
  setSelected: React.Dispatch<React.SetStateAction<T[]>>,
  topicContents: T[]
) {
  if (isAllSelected) {
    setSelected([]);
  } else {
    setSelected(topicContents);
  }
}

export function toggleSelectTopic<T>(
  item: T,
  selected: T[],
  setSelected: React.Dispatch<React.SetStateAction<T[]>>
) {
  if (selected.includes(item)) {
    setSelected(selected.filter((selectedItem) => selectedItem !== item));
  } else {
    setSelected([...selected, item]);
  }
}
