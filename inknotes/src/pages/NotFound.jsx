const main = {
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const title = {
  fontWeight: 500,
  textAlign: 'center',
  fontSize: '2.5em',
}

export default function NotFound(){
  return(
    <main style={main}>
      <h1 style={title}>
        404 | Page not found
      </h1>
    </main>
  )
}