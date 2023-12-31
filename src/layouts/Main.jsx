import { Outlet } from "react-router-dom";

import Nav from "../components/Nav";

const Main = () => {
  return (
    <section className=" max-w-5xl mx-auto relative h-fit">
      <Nav />
      <Outlet />
    </section>
  );
};

export default Main;
