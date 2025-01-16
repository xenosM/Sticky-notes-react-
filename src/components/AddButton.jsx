import Plus from "../icons/Plus"
import { useRef,useContext } from "react"
import { NoteContext } from "../context/NoteContext"
import { colors } from "../assets/colors"
import { db } from "../appwrite/database"
const AddButton=()=>{
    const {setNotes} = useContext(NoteContext)
    const startingPos = useRef(10)
    const addNote=async()=>{
        const payload ={
            position :JSON.stringify({
                x:startingPos.current,
                y:startingPos.current,
            }),
            colors:JSON.stringify(colors[0])
        }
        startingPos.current += 10;
        
        const response =await db.notes.create(payload)
        setNotes(n=>[response,...n])
    }
    return(
        <div id="add-btn" onClick={addNote}>
            <Plus/>
        </div>
    )
}
export default AddButton