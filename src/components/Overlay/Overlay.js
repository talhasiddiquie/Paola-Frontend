const getOverlayColor = (type) => {
  switch (type) {
    case "Legal":
      return "Green";
    case "Illegal":
      return "red";
    default:
      break;
  }
};

const Overlay = ({ type }) => {
  const color = getOverlayColor(type);
  return (
    <div
      className="overlay"
      style={{
        backgroundColor: color,
      }}
    />
  );
};

export default Overlay;
