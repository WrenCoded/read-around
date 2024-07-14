import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavComponent from "../components/Nav";

export default function MainLayout() {

  return (
    <>
    <NavComponent />
      <Outlet />
    </>
  );
}
