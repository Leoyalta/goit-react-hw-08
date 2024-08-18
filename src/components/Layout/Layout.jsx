import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={css.wrapper}>
      <AppBar />
      <Suspense fallback={<div className={css.loadingLayout}>Loading ...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
