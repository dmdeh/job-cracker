interface Props {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  className: string;
}

export function SelectionCard(props: Props) {
  const { title, onClick, className } = props;
  return (
    <div className={className} onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
}
