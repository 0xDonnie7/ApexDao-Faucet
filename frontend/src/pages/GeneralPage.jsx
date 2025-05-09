import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function GeneralPage() {
    return (
        <div className="general-page">
            <NavBar />
            <Outlet />
        </div>
    )
}