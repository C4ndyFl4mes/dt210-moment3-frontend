import Navigation from "../base/Navigation";


export default function Header() {
    return (
        <header className="py-4 shadow">
            <div className="container mx-auto px-2 flex justify-between items-center">
                <p className="font-semibold whitespace-nowrap">Moment 3</p>
                <Navigation />
            </div>
        </header>
    );
}