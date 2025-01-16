import { useContext } from "react"
import { NoteContext } from "../context/NoteContext"
import { db } from "../appwrite/database"
const Color=({color })=>{
    const {notes,setNotes,setSelectedNote,selectedNote}=useContext(NoteContext)
    const changeColor = async() => {

      try {
        //UPDATES THE CURRENT SELECTED CARD
        const currentNoteIndex = notes.findIndex(
          (note) => note.$id === selectedNote.$id
        );
        const updatedNote = {
          ...notes[currentNoteIndex],
          colors: JSON.stringify(color),
        };
        const newNotes = [...notes];
        newNotes[currentNoteIndex] = updatedNote;
        //RENDERS ALL THE CARD ALONG WITH THE UPDATED CARD
        setNotes(newNotes);

        //UPDATES IN DATABASE
         await db.notes.update(selectedNote.$id, {
          colors: JSON.stringify(color),
        });
      } catch (error) {
        alert("You must select a note before changing colors");
      }
    };
    
    return(
        <div
            onClick={changeColor}
            className="color"
            style={{backgroundColor:color.colorHeader}}
        >
        </div>
    )
}
export default Color