import { useEffect, useState } from "react";
import { Validation } from "../../validation.ts/Validation";
import type { IValidationError } from "../../interfaces/IValidationError";
import AuthService from "../../services/AuthService";
import type { IError } from "../../interfaces/IError";
import type { IUser } from "../../interfaces/user/IUser";

export default function AccountForm({ regOrLogin }: { regOrLogin: boolean }) {
    const [errors, setErrors] = useState<IValidationError>({} as IValidationError);
    const [apiError, setApiError] = useState<IError | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleFormSubmit() {
        const errors = await Validation.validateAccountForm({ username, password });
        setErrors((errors || {}) as IValidationError);

        if (Object.keys(errors || {}).length === 0) {
            if (regOrLogin) {
                const data = await AuthService().login({ username, password });
                if (data && "message" in data) {
                    data as IError;
                    console.error("Login error: " + data.message);
                    setApiError(data);
                } else {
                    data as IUser;
                    console.log("Login: " + data.username);
                    setUsername("");
                    setPassword("");
                    setErrors({} as IValidationError);
                    setApiError(null);
                }
            } else {
                const data = await AuthService().register({ username, password });
                if (data && "message" in data) {
                    data as IError;
                    console.error("Registration error: " + data.message);
                    setApiError(data);
                } else {
                    data as IUser;
                    console.log("Register: " + data.username);
                    setUsername("");
                    setPassword("");
                    setErrors({} as IValidationError);
                    setApiError(null);
                }
            }
        }
    }

    // Rensar formuläret och eventuella felmeddelanden när användaren byter mellan login och register.
    useEffect(() => {
        setUsername("");
        setPassword("");
        setErrors({} as IValidationError);
        setApiError(null);
    }, [regOrLogin]);

    return (
        <form className="max-w-md w-full p-6 bg-white rounded-lg shadow-md flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.username && (
                    <span className="block text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
                        {errors.username}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.password && (
                    <span className="block text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
                        {errors.password}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-y-2">
                {apiError && (
                    <span className="block text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
                        {apiError.message}
                    </span>
                )}
            </div>
            <div className="pt-2">
                <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition cursor-pointer"
                >
                    {regOrLogin ? "Login" : "Register"}
                </button>
            </div>
        </form>
    );
}