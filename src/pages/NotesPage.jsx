// import { fakeData as notes } from "../assets/fakeData";
import NoteCard from "../components/NoteCard";
import { useState,useEffect } from "react";
// import { databases } from "../appwrite/config";
import { db } from "../appwrite/database";

const NotesPage = () => {
  const [notes,setNotes] = useState([])

  useEffect(()=>{
    init()
  },[])

  const init = async()=>{
    // const response = await databases.listDocuments(
    //   import.meta.env.VITE_DATABASE_ID,
    //   import.meta.env.VITE_COLLECTION_NOTES_ID
    // );
    const response = await db.notes.list()
    setNotes(response.documents)

  }

  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
};
export default NotesPage;
