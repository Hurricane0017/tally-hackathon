import { NavLink } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink exact to="/" className="nav-link" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/problems" className="nav-link" activeClassName="active">
        Problems
      </NavLink>
      <NavLink to="/contest" className="nav-link" activeClassName="active">
        Contest
      </NavLink>
      <NavLink to="/profile" className="nav-link" activeClassName="active">
        Profile
      </NavLink>
    </nav>
  );
}
