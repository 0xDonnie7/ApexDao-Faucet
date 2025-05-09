import { NavLink } from "react-router-dom";
import { useNavLinkContext } from "./NavLinkContext";

export default function NavBar() {
    const { isNavLinkEnabled } = useNavLinkContext();

    return (
        <nav>
            <ul className="nav-links">
                <li>
                    <NavLink
                        to="/connect-wallet"
                        className={({ isActive }) => isActive ? "link active" : "link"}
                    >
                        Connect Wallet
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={isNavLinkEnabled ? "/claim" : "#"}
                        onClick={(e) => {
                            if (!isNavLinkEnabled) e.preventDefault();
                        }}
                        className={({ isActive }) =>
                            `link ${isActive ? "active" : ""} ${!isNavLinkEnabled ? "disabled" : ""}`
                        }
                    >
                        Claim Faucet
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
