import form from '../styles/TextForm.module.css';
import { useApi } from "../hooks/useApi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');

  const [failMessage, setFailMessage] = useState({value: false, text: ''});
  const [successMsg, setSuccessMsg] = useState(false);

  const api = useApi();
  const navigate = useNavigate();
  const cancelBtn = () => navigate('/');  

  const saveNote = async() => {
    if(title.length === 0){
      setFailMessage({value: true, text: 'Please insert a title in the Note'});
      return
    }

    try{
      await api.create(title, description, text);
      setSuccessMsg(true);
    }catch(err){
      console.log(err);
      setFailMessage({
        value: true,
        text: 'Failed to save: Internal server error'
      });
    }
  }

  return(
    <div className={form.form}>
      
      <h1 className={form.formTitle}>
        Create Note
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