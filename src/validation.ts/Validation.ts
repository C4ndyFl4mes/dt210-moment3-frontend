import * as Yup from "yup";
import type { IAuth } from "../interfaces/user/IAuth";
import type { IValidationError } from "../interfaces/IValidationError";

export class Validation {

    static accountSchema = Yup.object({
        username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
        password: Yup.string().required("Password is required").min(16, "Password must be at least 16 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    });

    static async validateAccountForm(data: IAuth): Promise<IValidationError | {}> {
        try {
            await this.accountSchema.validate(data, { abortEarly: false });
            return {};
        } catch (errors) {
            const validationErrors: IValidationError = {};
            if (errors instanceof Yup.ValidationError) {
                errors.inner.forEach((error) => {
                    validationErrors[error.path!] = error.message;
                });
            }
            return validationErrors;
        }
    }

}