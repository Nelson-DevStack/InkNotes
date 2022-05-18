import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useFetch } from '../../hooks/useFetch';
import { useSWRConfig } from 'swr';
import style from './MainGrid.module.css';
import Loading from '../Loading/index';

export default function MainGrid(){
  const api = useApi();
  const url = process.env.REACT_APP_API;

  const { data, error } = useFetch(`${url}/notes`);
  const { mutate } = useSWRConfig();

  if(error) return <h1>Failed to Fetch Data...</h1>;
  if(!data) return <Loading />;
  if(data.length === 0){
    return(
      <h1>There is no Notes. Click the "+" button to create a Note.</h1>
    )
  };
    
  const deleteNote = async (noteId) => {
    await api.delete(noteId);
    mutate(`${url}/notes`);
  };  

  return(
    <div className={style.wrapper}>
      {data.map((note)=>(
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