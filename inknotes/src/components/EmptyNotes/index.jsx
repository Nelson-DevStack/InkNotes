import style from './style.module.css';

export default function EmptyNotes(){
  return(
    <div className={style.container}>
      <h1 className={style.title}>
        There is no Notes. Click the "Create" link to start writing a Note
      </h1>
    </div>
  )
}