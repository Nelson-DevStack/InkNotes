import style from './MainGrid.module.css';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useEffect, useState } from 'react';
import FailedFetch from '../FailedFetch/index';
import Loading from '../Loading/index';

export default function MainGrid(){
  const api = useApi();
  const [notesData, setNotesData] = useState([]);
  const [failedLoading, setFailedLoading] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const data = await api.getAll();
        setNotesData(data);
      }catch(err){
        console.log(err);
        setFailedLoading(true);
      }
    }
    fetchData();
  }, [notesData.length]);

  const deleteNote = async (noteId) => {
    await api.delete(noteId);
    const newData = notesData.filter((element, index) => {
      return element._id !== noteId;
    })
    setNotesData(newData);
  }

  if(failedLoading) return <FailedFetch />
  if(!notesData) return <Loading />
  if(notesData.length === 0){
    return(
      <h1>There is no Notes. Click the "+" button to create a Note.</h1>
    )
  }

  return(
    <div className={style.wrapper}>
      {notesData.map((note)=>(
        <div className={style.card} key={note._id}>
          <h1 className={style.cardTitle}>
            {note.title}
          </h1>
          <p className={style.cardDesc}>
            {note.description}
          </p>
          <div className={style.cardFooter}>
            <Link to={`/read/${note._id}`} className={`${style.btn} ${style.readBtn}`}>
              Read
            </Link>
            <Link to={`/edit/${note._id}`} className={`${style.btn} ${style.editBtn}`}>
              Edit
            </Link>

            <button
              className={`${style.btn} ${style.delBtn}`}
              onClick={()=> deleteNote(note._id)}
            >
              Del
            </button>
          </div>
        </div>
      ))}

    </div>
  )
}