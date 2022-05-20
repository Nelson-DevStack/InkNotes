import style from './style.module.css';

export default function FailedFetch(){
  const buttonAction = () => window.location.reload();

  return(
    <div className={style.container}>
      <h1 className={style.title}>Failed to fetch data. Internal Server error 😞</h1>
      <button className={style.button} onClick={buttonAction}>
        Reload Page
      </button>
    </div>   
  )
}