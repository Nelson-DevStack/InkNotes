import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import reader from './Reader.module.css';

export default function Reader(){
  const api = useApi();
  const params = useParams();
  const noteID = params.noteId;

  const [loading, setLoading] = useState(true);
  const [noteData, setNoteData] = useState();

  useEffect(()=>{
    const getNote = async () => {
      const data = await api.getById(noteID);
      setNoteData(data);
      setLoading(false);
    }
    getNote();
  }, []);

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

  return(
    <div className={reader.readerWrapper}>

      <h1 className={reader.readerTitle}>
        {noteData.title}
      </h1>

      <p className={reader.readerDesc}>
        {noteData.description}
      </p>

      <hr className={reader.separator} />

      <p className={reader.readerText}>
        {noteData.text}
      </p>

    </div>
  );
}