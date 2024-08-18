import css from "./ContactList.module.css";
import Contact from "../Contact/Contact.jsx";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { useSelector } from "react-redux";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          <Contact id={id} name={name} number={number} />
        </li>
      ))}
    </ul>
  );
}
