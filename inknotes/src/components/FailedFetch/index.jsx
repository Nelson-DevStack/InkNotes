const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  title: {
    fontSize: '2.5em',
    fontWeight: '500',
    textAlign: 'center',
  }
}

export default function FailedFetch(){
  return(
    <div style={style}>
      <h1 style={style.title}>Server request failed  😞</h1>
    </div>   
  )
}