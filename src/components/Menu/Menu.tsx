import "./menu.scss";
import {Dispatch, FC, SetStateAction} from "react";

// Define the MenuProps interface
interface MenuProps {
    menuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const  Menu : FC<MenuProps> = ({menuOpen, setMenuOpen})=> {
    return (


        <div className= {"menu " + (menuOpen && "active")}>
            <ul>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="#intro">Home</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="#portfolio">Summary</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="#works">Works</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="#contact">Contact</a>
                </li>
            </ul>
        </div>

    );
}
export default Menu;