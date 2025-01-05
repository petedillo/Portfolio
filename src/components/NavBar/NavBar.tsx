import "./NavBar.scss";
import Mail  from "@mui/material/Icon";
import Person  from "@mui/material/Icon";
import {Dispatch, FC, SetStateAction} from "react";

interface navbarProps {
    menuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

// Function component typed with MyComponentProps
const NavBar: FC<navbarProps> = ({ menuOpen, setMenuOpen }) => {
    return (
        <div className={"navbar " + (menuOpen ? "active" : "")}>
            <div className="wrapper">
                <div className="left">
                    <a href="#intro" className="logo">
                        pedro.
                    </a>
                    <div className="itemContainer">
                        <Person className="icon"/>
                        <span>(512) 765-4979</span>
                    </div>
                    <div className="itemContainer">
                        <Mail className="icon"/>
                        <span>pedelgadillo@gmail.com</span>
                    </div>
                </div>
                <div className="right">
                    <div className="dashes" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="line1"></span>
                        <span className="line2"></span>
                        <span className="line3"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
