import loadingGif from '../../assets/loading.gif';

const styles = {
  height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  title: {
    fontWeight: 400,
    marginBottom: '1em',
  },
  img: {
    width: '100px',
    height: 'auto',
  }
}

export default function Loading(){
  return(
    <div style={styles}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={styles.title}>Loading Notes</h1>
        <br />
        <img src={loadingGif} style={styles.img} alt={'Loading status circle'} />
      </div>
    </div>
  )
}