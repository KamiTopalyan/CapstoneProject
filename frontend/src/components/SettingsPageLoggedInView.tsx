import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Style as StyleModel } from '../models/style';
import * as StyleApi from "../network/style_api";
import { StyleInput } from "../network/style_api";
import styles from "../styles/StylesPage.module.css";
import Setting from './Setting';


const SettingsPageLoggedInView = () => {

    const [style, setStyle] = useState<StyleModel>({
        _id: "0",
        backgroundColor: "#fff",
        navbarColor: "#fff",
        passwordColor: "#fff",
    });

    useEffect(() => {
        async function Style() {
            try {
                const styles = await StyleApi.fetchStyle();
                setStyle(styles);
            } catch (error) {
                console.error(error);
            }
        }
        Style();  
    }, []);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<StyleInput>({
        defaultValues: {
            backgroundColor: style.backgroundColor || "",
            navbarColor: style.navbarColor || "",
            passwordColor: style.passwordColor || "",
            
        }
    });
    async function onSubmit() {
        try {
            let styleResponse: StyleInput;
            styleResponse = await StyleApi.updateStyle(style._id, style);
            console.log(styleResponse)
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const styleGrid =

                <div key={style._id}>
                <Form id="StyleForm" onSubmit={handleSubmit(onSubmit)} >
                    <Setting
                        register={register} 
                        styleModel={style}
                        className={styles.style}
                    />
                </Form>
                </div>
    return (
        <div>
        {styleGrid}
        <Button
            type="submit"
            form="StyleForm"
            disabled={isSubmitting}
        >
            Save
        </Button>
        </div>
    )
}

export default SettingsPageLoggedInView;

