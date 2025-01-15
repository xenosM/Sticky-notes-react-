import Trash from "../icons/Trash";
import React, { useRef, useEffect, useState } from "react";
import { setNewOffset, autoGrow, setZIndex } from "../utils";

const NoteCard = ({ note }) => {
  //*Static Variable
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  let mouseStartPos = { x: 0, y: 0 };
  //*State Variable
  const [position, setPosition] = useState(JSON.parse(note.position));
  //*Reference Variable
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  //* Side Effects
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);
  //*Function Declaration
  const handleMouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    setZIndex(cardRef.current)
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e) => {
    //calculate how far the mouse has moved since the last mouse move
    //previous position- current position
    //if mouse goes right result is  - and if mouse goes left result is +
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //Updates the mouse starting position to the current mouse position for next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    //the current left and top value of card - the direction and magnitude the card goes
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseDown);
  };
  //*Return Value
  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        className="card-header"
        style={{
          backgroundColor: colors.colorHeader,
        }}
        onMouseDown={handleMouseDown}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={()=>setZIndex(cardRef.current)}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
