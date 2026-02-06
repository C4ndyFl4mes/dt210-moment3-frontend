import { useState } from "react";
import AccountForm from "../components/base/AccountForm";

export default function AccountPage() {
    const [regOrLogin, setRegOrLogin] = useState(true);

    function toggleRegOrLogin() {
        setRegOrLogin(!regOrLogin);
    }
    return <>
        <h1 className="font-bold text-2xl text-center">Account</h1>
        <div className="w-100 max-w-[95vw] mx-auto mt-15">
            <div className="flex items-center justify-between flex-wrap px-5">
                {regOrLogin ? <p className="font-bold">Login Form</p> : <p className="font-bold">Register Form</p>}
                <button onClick={toggleRegOrLogin} className="text-blue-600 hover:underline cursor-pointer">{regOrLogin ? "Switch to Register" : "Switch to Login"}</button>
            </div>
            <AccountForm regOrLogin={regOrLogin} />
        </div>
    </>
}