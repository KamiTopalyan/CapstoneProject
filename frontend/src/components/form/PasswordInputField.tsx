import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormClearErrors, UseFormRegister, UseFormResetField, UseFormTrigger } from "react-hook-form";
import { generate } from "../../utils/generatePassword"
import { PasswordInput } from "../../network/passwords_api";


interface PasswordInputFieldProps {
    password: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    clearError: UseFormClearErrors<PasswordInput>,
    error?: FieldError,
    [x: string]: any,
}

const PasswordInputField = ({ password, label, register, registerOptions, clearError, error, ...props }: PasswordInputFieldProps) => {
    return (
        <Form.Group className="mb-3" controlId={password + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...props}
                {...register(password, registerOptions)}
                isInvalid={!!error}
            />
            <button type="button" onClick={() => {
                if(document.getElementById(password + "-input") != undefined) {
                    (document.getElementById(password + "-input") as any)._valueTracker.setValue(generate());
                    (document.getElementById(password + "-input") as HTMLInputElement).value = generate();
                    (document.getElementById(password + "-input") as HTMLInputElement).focus();
                    clearError();
                    (console.log(document.getElementById(password + "-input") as any))}}}
                    >
                    
                        Use Random Password
                        </button>
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
            
        </Form.Group>
    );
}
export default PasswordInputField;