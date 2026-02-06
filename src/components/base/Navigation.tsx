import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function handleNavClick() {
        setTimeout(() => {
            setMenuOpen(false);
        }, 150);
    }
    return (
        <nav className="flex flex-col items-center w-full px-[10%]">
            <button onClick={toggleMenu} className="md:hidden px-4 py-1 bg-sky-300 max-w-fit rounded-md cursor-pointer hover:brightness-95 active:brightness-90 duration-200">Toggle</button>
            <div className="relative w-[inherit] md:flex md:justify-end">
            <ul className={`flex flex-col md:flex-row ${menuOpen ? "flex" : "hidden"} md:flex absolute bg-white z-10 md:relative w-[inherit] md:w-auto top-4 shadow md:shadow-none rounded-bl-md rounded-br-md md:rounded-bl-none md:rounded-br-none`}>
                <li className="text-center custom-transition-effect">
                    <NavLink to="/account" className="block w-full py-2 md:px-4" onClick={handleNavClick}>Account</NavLink>
                </li>
                <li className="text-center custom-transition-effect">
                    <NavLink to="/" className="block w-full py-2 md:px-4" onClick={handleNavClick}>Threads</NavLink>
                </li>
                <li className="text-center custom-transition-effect rounded-bl-md rounded-br-md md:rounded-bl-none md:rounded-br-none">
                    <NavLink to="/admin" className="block w-full py-2 md:px-4" onClick={handleNavClick}>Admin Panel</NavLink>
                </li>
            </ul>
            </div>
        </nav>
    );
}