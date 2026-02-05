export default function Summary({ count, total }) {
  return (
    <p className="text">
      You have selected <span>{count}</span> seats for a price of ${total}
    </p>
  );
}
