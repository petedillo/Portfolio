import "./App.scss";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar.tsx";
import Menu from "./components/Menu/Menu.tsx";
import Intro from "./views/Intro/Intro.tsx";
import Summary from "./views/Summary/Summary.tsx";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <section className="sections">
        <Intro menuOpen={menuOpen} />
        <Summary />
      </section>
    </>
  );
}

export default App;
