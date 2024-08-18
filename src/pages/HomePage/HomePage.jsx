import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>PHONEBOOK</h2>
      <h3 className={css.titleHome}>Welcome to HomePage</h3>
      <p className={css.textApp}>Please, login or create yout account!</p>
    </div>
  );
}
