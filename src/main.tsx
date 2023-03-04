import './main.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './app'
import { Center, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  bgImg: {
    // filter: 'blur(1px)',
    position: 'absolute',
    top: 0,
    left: 0,
    boxShadow: 'inset 0 0 10px 10px #000',
  },
  miraImg: {
    position: 'absolute',
    top: -190,
    left: -11,
  },
  // ref: https://in.pinterest.com/pin/1051801687951177624/
  name: {
    position: 'absolute',
    top: 70,
    left: 30,
    margin: 0,
    rotate: '310deg',
    // color: '#171731',
    // color: '#f4527f',
    color: '#b1d3f4',
    letterSpacing: 2,
    // textShadow: '13px 5px 52px #db2f3b',
    textShadow: '0 0 33px #010414',
    // textShadow: '0 0 22px #270483',
    // 0 0
  },
}))

const App = () => {
  const { classes } = useStyles()

  return (
    <Center>
      {/* <img className={classes.bgImg} src="green-bg.webp" /> */}
      {/* <img className={classes.bgImg} src="bga.jpeg" height="1200" /> */}
      {/* <img className={classes.bgImg} src="bgb.jpeg" height="1100" /> */}
      <img
        className={classes.bgImg}
        src="https://i.pinimg.com/originals/7c/5e/44/7c5e44c69c80ef10b1fc97d353f3d02f.jpg"
        height="1100"
      />
      <img
        className={classes.miraImg}
        src="/mira.png"
        height="1500"
        width="675"
      />
      <p className={classes.name} style={{ fontSize: '6rem' }}>
        Mira
      </p>
    </Center>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
