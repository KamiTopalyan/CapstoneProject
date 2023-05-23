import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { generate } from "../../utils/generatePassword"


interface PasswordInputFieldProps {
    password: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const PasswordInputField = ({ password, label, register, registerOptions, error, ...props }: PasswordInputFieldProps) => {
    return (
        <Form.Group className="mb-3" controlId={password + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...props}
                {...register(password, registerOptions)}
                isInvalid={!!error}
            />
            <button type="button" onClick={() => {if(document.getElementById(password + "-input") != undefined) {(document.getElementById(password + "-input") as HTMLInputElement).value = generate();console.log((document.getElementById(password + "-input") as any).classList.remove("is-invalid"))}}}>Use Random Password</button>
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
            
        </Form.Group>
    );
}
export default PasswordInputField;