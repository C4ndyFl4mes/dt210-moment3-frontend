import type { ReactElement } from "react";


export default function Header(): ReactElement {
    return (
        <header className="text-center py-4 shadow">
            <p className="font-bold text-xl">Boilerplate React TS Tailwind v4 Axios</p>
        </header>
    );
}