import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const buildLinkClass = ({ isActive }) => {
  return `${css.link} ${isActive ? css.active : ""}`;
};

export default function AuthNav() {
  return (
    <nav className={css.nav}>
      <NavLink to="/register" className={buildLinkClass}>
        Registration
      </NavLink>
      <NavLink to="/login" className={buildLinkClass}>
        Log in
      </NavLink>
    </nav>
  );
}
