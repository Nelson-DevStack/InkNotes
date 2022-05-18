import form from '../styles/TextForm.module.css';
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
  const [message, setMessage] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const { data, error } = useFetch(`/note/${noteID}`);

  useEffect(()=>{
    if(data){
      setTitle(data.title);
      setDescription(data.description);
      setText(data.text);
    };
  }, [data]);

  if(error) return <h1>Failed to Fetch...</h1>;
  if(!data) return <h1>Loading ...</h1>;

  const updateNote = async () =>{
    await api.update(noteID, title, description, text);
  }

  const cancelBtn = () => navigate('/');

  return(
    <div className={form.form}>
      
      <h1 className={form.formTitle}>
        Edit Post
      </h1>
      <hr className={form.separator} />

      <div
        className={`${message ? `${form.alert} ${form.lightDanger}` : form.alertHidden}`}
        onTransitionEnd={()=> setMessage(false)}
      >
        Insert a <strong>title</strong> in the Note
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
          onClick={() => {
            if(title.length === 0){
              setMessage(true)
              return
            }
            updateNote()
            setSuccessMsg(true)
          }}
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