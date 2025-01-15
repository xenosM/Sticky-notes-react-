export  function setNewOffset(card,mouseMoveDir ={x:0,y:0}){
     const newOffsetLeft = card.offsetLeft - mouseMoveDir.x
     const newOffsetTop = card.offsetTop - mouseMoveDir.y

     return{
        x:newOffsetLeft <0 ? 0 :newOffsetLeft,
        y:newOffsetTop <0 ? 0 :newOffsetTop,

     }
};
export function autoGrow(textAreaRef) {
  const { current } = textAreaRef;
  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
}
export function setZIndex(selectedCard){
    selectedCard.style.zIndex=999;

    document.querySelectorAll(".card").forEach(card=>{
        if(card != selectedCard){
            card.style.zIndex= 1;
        }
    })

}