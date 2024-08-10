import { NavLink } from "react-router-dom";
import classes from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={classes.navbar}>
      <NavLink exact to="/" className={classes.navLink} activeClassName={classes.active}>
        Home
      </NavLink>
      <NavLink to="/problems" className={classes.navLink} activeClassName={classes.active}>
        Problems
      </NavLink>
      <NavLink to="/ide" className={classes.navLink} activeClassName={classes.active}>
        IDE
      </NavLink>
      <NavLink to="/contest" className={classes.navLink} activeClassName={classes.active}>
        Contest
      </NavLink>
      <NavLink to="/profile" className={classes.navLink} activeClassName={classes.active}>
        Profile
      </NavLink>
    </nav>
  );
}
