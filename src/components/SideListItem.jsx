export default function SideListItem({
  isSelectedCripto,
  setSelectedCripto,
  item: { id, name }
}) {
  return (
    <li key={id}>
      <button
        className={isSelectedCripto(id) ? "selected" : ""}
        onClick={() => setSelectedCripto(id)}
      >
        {name}
      </button>
    </li>
  );
}
