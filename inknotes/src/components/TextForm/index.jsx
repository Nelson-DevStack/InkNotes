import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import form from './TextForm.module.css';

export default function TextForm({ formTitle, action }){
  const navigate = useNavigate();
  const cancelBtn = () => navigate('/');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');

  const [message, setMessage] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
    
  return(
    <div className={form.form}>
      
      <h1 className={form.formTitle}>
        {formTitle}
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
        className={form.inputStyle}
        value={text}
        onChange={(e)=> setText(e.target.value)}
      />

      <div className={form.formFooter}>
        <button 
          className={`${form.button} ${form.success}`}
          onClick={()=> {
            if(title.length === 0){
              setMessage(true)
              return
            }
            action(title, description, text)
            setSuccessMsg(true)
          }}
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