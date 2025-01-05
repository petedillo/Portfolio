import './App.scss'
import {useState} from "react";
import NavBar from "./components/NavBar/NavBar.tsx";
import Menu from "./components/Menu/Menu.tsx";


function App() {
    const [menuOpen,setMenuOpen] = useState(false)

  return (
      <>
          <div className='app'>
              <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              {/*<div className="sections">*/}
              {/*    <Intro menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>*/}
              {/*    <Portfolio/>*/}
              {/*    <Works/>*/}
              {/*    <Testimonials/>*/}
              {/*    <Contact/>*/}
              {/*</div>*/}
          </div>
      </>
  )
}

export default App
