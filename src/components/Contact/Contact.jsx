import css from "./Contact.module.css";
import { IoPerson } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  const handleOnDelete = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className={css.item}>
      <div className={css.box}>
        <p>
          <IoPerson /> {name}
        </p>
        <p>
          <BsTelephoneFill /> {number}
        </p>
      </div>
      <button className={css.btn} onClick={() => handleOnDelete(id)}>
        Delete
      </button>
    </div>
  );
}
