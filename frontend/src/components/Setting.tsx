import style from "../styles/settings.module.css";
import { Style as StyleModel } from "../models/style";
import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface StyleProps {
    styleModel: StyleModel,
    className?: string,
    register: UseFormRegister<any>,
}

const Style = ({ styleModel, className, register }: StyleProps) => {
    const {
        backgroundColor,
        navbarColor,
        passwordColor,
    } = styleModel;

    return (
        <div>
            <Form.Group className="mb-3" controlId={"backgroundColor-input"}>
                <Form.Label>{"Background Color: "}</Form.Label>
                <Form.Control {...register("backgroundColor", { value: backgroundColor, pattern: /^#[0-9A-F]{6}$/i})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"navbarColor-input"}>
                <Form.Label>{"Navbar Color: "}</Form.Label>
                <Form.Control {...register("navbarColor", { value: navbarColor, pattern: /^#[0-9A-F]{6}$/i})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"passwordColor-input"}>
                <Form.Label>{"Password Box Color: "}</Form.Label>
                <Form.Control {...register("passwordColor", { value: passwordColor, pattern: /^#[0-9A-F]{6}$/i})} />
            </Form.Group>

        </div>
        
    )
}

export default Style;