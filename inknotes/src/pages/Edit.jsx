import form from '../styles/TextForm.module.css';
import FailedFetch from '../components/FailedFetch';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from '../hooks/useApi';
import { useFetch } from '../hooks/useFetch';

export default function Edit(){
  const api = useApi();
  const navigate = useNavigate();
  const params = useParams();
  const noteID = params.noteId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');

  const [failMessage, setFailMessage] = useState({value: false, text: ''});
  const [successMsg, setSuccessMsg] = useState(false);

  const { data, error } = useFetch(`/note/${noteID}`);

  useEffect(()=>{
    if(data){
      setTitle(data.title);
      setDescription(data.description);
      setText(data.text);
    };
  }, [data]);

  if(error) return <FailedFetch /> ;
  if(!data) return <h1>Loading ...</h1>;

  const updateNote = async () =>{
    if(title.length === 0){
      setFailMessage({
        value: true,
        text: 'Please insert a title in the Note',
      })
      return
    };

    try{
      await api.update(noteID, title, description, text);
      setSuccessMsg(true);
    }catch(err){
      setFailMessage({
        value: true,
        text: 'Failed to save: Internal server error'
      });
    }
  }

  const cancelBtn = () => navigate('/');

  return(
    <div className={form.form}>
      
      <h1 className={form.formTitle}>
        Edit Post
      </h1>
      <hr className={form.separator} />

      <div
        className={`${failMessage.value ? `${form.alert} ${form.lightDanger}` : form.alertHidden}`}
        onTransitionEnd={()=> setFailMessage({value: false, text: failMessage.text})}
      >
        {failMessage.text}
      </div>

      <div
        className={`${successMsg ? `${form.alert} ${form.lightSuccess}` : form.alertHidden} `}
        onTransitionEnd={()=> setSuccessMsg(false)}
      >
        Note edited successfully
      </div>

      <label className={form.inputLabel}>Note Title</label>
      <input
        type="text"
        className={form.inputStyle}
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
      />

      <label className={form.inputLabel}>Note Description</label>
      <input 
        type="text"
        className={form.inputStyle}
        value={description}
        onChange={(e)=> setDescription(e.target.value)}
      />

      <label className={form.inputLabel}>Note Text</label>
      <textarea 
        rows="10"
        className={form.inputTextArea}
        value={text}
        onChange={(e)=> setText(e.target.value)}
      />

      <div className={form.formFooter}>
        <button 
          className={`${form.button} ${form.yellow}`}
          onClick={updateNote}
        >
          Edit
        </button>

        <button 
          className={`${form.button} ${form.gray}`}
          onClick={cancelBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}