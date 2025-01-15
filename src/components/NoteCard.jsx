import Trash from "../icons/Trash";
import React, { useRef,useEffect } from "react";

const NoteCard = ({ note }) => {
  let position = JSON.parse(note.position);
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);

  const textAreaRef = useRef(null);
  useEffect(()=>{autoGrow(textAreaRef)},[])
  
  function autoGrow(textAreaRef){
      console.log("🚀 ~ autoGrow ~ textAreaRef:", textAreaRef)
      const {current} =textAreaRef
      current.style.height="auto";
      current.style.height  = current.scrollHeight +"px"
      
  }
  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{
          backgroundColor: colors.colorHeader,
        }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={()=>{autoGrow(textAreaRef)}}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
