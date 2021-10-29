import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/ItemTypes";
import DragHandleIcon from "@material-ui/icons/DragHandle";

const DragableImage = (props) => {
  const {
    src,
    alt,
    items,
    index,
    selected,
    onSelect,
    dropable,
    onDropSingleImage,
    onRearrangeImages,
    onDropMultipleImages,
  } = props;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.IMAGE,
      item: { id: index },
      end: (item, monitor) => {
        if (items) {
          const didDrop = monitor.didDrop();
          if (didDrop && items.length >= 1) return onDropMultipleImages();
          return onDropSingleImage(item);
        }
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [items]
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.IMAGE,
      drop: (item, monitor) => onRearrangeImages(index, item.id),
      canDrop: () => true,
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <>
      <img
        style={{
          opacity: isDragging ? 0.5 : 1,
          filter: isOver ? "blur(5px)" : "blur(0px)",
          border: selected ? "1px solid yellow" : "0.1px solid white",
        }}
        ref={dropable ? drop : drag}
        alt={alt ? alt : `uploaded ${index}`}
        src={src}
        onClick={onSelect}
      />
      {dropable ? (
        <div
          ref={drag}
          style={
            isDragging
              ? {
                  margin: "0px",
                  width: "33.3%",
                  height: "100%",
                }
              : {}
          }
          className="dragable-icon"
        >
          <DragHandleIcon style={{ color: "white" }} fontSize="small" />
        </div>
      ) : null}
    </>
  );
};

export default DragableImage;
