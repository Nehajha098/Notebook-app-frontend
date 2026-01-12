import "./navbar.css"
import logo from "../assets/logo notebook.png";

function Navbar() {
    return(
        <div className="nav">
            <h3>Notely</h3>
            <div className="logo">
                <img src={logo} alt="notebook logo"></img>
            </div>
        </div>
    );
}

export default Navbar;