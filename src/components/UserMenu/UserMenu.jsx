import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.menuContainer}>
      <p className={css.title}>Welcome, {user.name}</p>
      <button type="button" onClick={handleLogout} className={css.btnLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
