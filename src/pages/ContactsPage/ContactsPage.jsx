import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  selectError,
  selectFilteredContacts,
} from "../../redux/contacts/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import Loader from "../../components/Loader/Loader";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [isLoggedIn, dispatch]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <div className={css.container}>
          <div className={css.wrapperFilter}>
            <ContactForm />
            <SearchBox />
          </div>
          {contacts.length > 0 && <ContactList />}
        </div>
      )}
    </div>
  );
}
