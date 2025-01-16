import Trash from "../icons/Trash";
import Spinner from "../icons/spinner";
import DeleteButton from "./DeleteButton";
import React, { useRef, useEffect, useState } from "react";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/database";

const NoteCard = ({ note}) => {
  //*Static Variable
  const body = bodyParser(note.body);
  const colors = JSON.parse(note.colors);
  let mouseStartPos = { x: 0, y: 0 };
  //*State Variable
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [saving,setSaving] = useState(false);
  //*Reference Variable
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  const keyUpTimer = useRef(null)
  //* Side Effects
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);
  //*Function Declaration
  const handleMouseDown = (e) => {
    if(e.target.className ==="card-header"){
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
      setZIndex(cardRef.current);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
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

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };
  const handleKeyUp = async()=>{
      //initiate saving
      setSaving(true)
      
      //
      if(keyUpTimer.current){
        clearTimeout(keyUpTimer.current)
      }
      keyUpTimer.current = setTimeout(()=>{
        saveData("body",textAreaRef.current.value)
      },2000)

  }
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (err) {
      console.log(err);
    }
    setSaving(false)
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
        <DeleteButton  noteId={note.$id}/>
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => setZIndex(cardRef.current)}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
