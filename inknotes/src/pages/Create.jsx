import form from '../styles/TextForm.module.css';
import { useApi } from "../hooks/useApi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');

  const [message, setMessage] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const api = useApi();
  const navigate = useNavigate();
  const cancelBtn = () => navigate('/');  

  const saveNote = async() => {
    if(title.length === 0){
      setMessage(true);
      return
    }

    try{
      await api.create(title, description, text);
    }catch(err){
      console.log(err);
    }
    setSuccessMsg(true);
  }

  return(
    <div className={form.form}>
      
      <h1 className={form.formTitle}>
        Create Note
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
        Note created successfully
      </div>

      <label className={form.inputLabel}>Note Title</label>
      <input
        type="text"
        className={form.inputStyle}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
          className={`${form.button} ${form.success}`}
          onClick={saveNote}
        >
          Save
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