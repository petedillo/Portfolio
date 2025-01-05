import './App.scss'
import {useState} from "react";
import NavBar from "./components/NavBar/NavBar.tsx";
import Menu from "./components/Menu/Menu.tsx";
import Intro from './components/Intro/Intro.tsx';
import Portfolio from './components/Portfolio/Portfolio.tsx';


function App() {
    const [menuOpen,setMenuOpen] = useState(false)

  return (
      <>
          <div className='app'>
              <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              <section className="sections">
                 <Intro menuOpen={menuOpen}/>
                 <Portfolio/>
              </section>
          </div>
      </>
  )
}

export default App
