import form from '../components/TextForm/TextForm.module.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from '../hooks/useApi';

export default function Edit(){
  const api = useApi();
  const navigate = useNavigate();
  const params = useParams();
  const noteID = params.noteId;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(()=>{
    const getData = async () => {
      try{
        const data = await api.getById(noteID);
        setTitle(data.title);
        setDescription(data.description);
        setText(data.text);
        setLoading(false);
      }catch(err){
        console.log(err);
      }
    }
    getData();
  }, [noteID]);

  const updateNote = async () =>{
    await api.update(noteID, title, description, text);
  }

  const cancelBtn = () => navigate('/');

  if(loading){
    return <h1>Loading ...</h1>
  }

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
        className={form.inputStyle}
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