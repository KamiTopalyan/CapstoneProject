import style from "../styles/settings.module.css";
import { Style as StyleModel } from "../models/style";
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";

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
                <Form.Control {...register(backgroundColor)} defaultValue={backgroundColor}/>
            <Form.Group/>
            <Form.Group className="mb-3" controlId={"navbarColor-input"}>
                <Form.Label>{"Navbar Color: "}</Form.Label>
                <Form.Control {...register(navbarColor)} defaultValue={navbarColor}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId={"passwordColor-input"}></Form.Group>
                <Form.Label>{"Password Box Color: "}</Form.Label>
                <Form.Control {...register(passwordColor)} defaultValue={passwordColor}/>
            </Form.Group>
        </div>
    )
}

export default Style;