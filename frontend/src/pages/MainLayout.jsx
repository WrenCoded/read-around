import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavComponent from "../components/Nav";
import { Nav } from "react-bootstrap";



export default function MainLayout() {
    const navigate = useNavigate();



  return (
    <>
    <NavComponent />
      <Outlet />
    </>
  );
}
