import { createContext, useContext, useState } from 'react';

const NavLinkContext = createContext();

export const NavLinkProvider = ({ children }) => {
    const [isNavLinkEnabled, setIsNavLinkEnabled] = useState(null);

    return (
        <NavLinkContext.Provider value={{ isNavLinkEnabled, setIsNavLinkEnabled }}>
            {children}
        </NavLinkContext.Provider>
    );
};

export const useNavLinkContext = () => useContext(NavLinkContext);
