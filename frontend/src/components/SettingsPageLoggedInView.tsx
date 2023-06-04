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

    const [style, setStyle] = useState<StyleModel>();

    useEffect(() => {
        async function Style() {
            try {
                const styles = await StyleApi.fetchStyle();
                document.body.style.backgroundColor = styles.backgroundColor
                setStyle(styles);
            } catch (error) {
                console.error(error);
            }
        }
        Style();  
    }, []);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<StyleInput>({
        defaultValues: {
            backgroundColor: style?.backgroundColor,
            navbarColor: style?.navbarColor,
            passwordColor: style?.passwordColor,
        }

    });
    async function onSubmit(input: StyleInput) {
        try {
            let styleResponse: StyleInput;
            if (style) {
                styleResponse = await StyleApi.updateStyle(style._id, input);
                window.location.reload();
            }
            else {
                alert("Something Went Wrong")
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    if(style) {
        return (
            <div>
                <div key={style?._id}>
                    <Form id="StyleForm" onSubmit={handleSubmit(onSubmit)} >
                        <Setting
                            register={register} 
                            styleModel={style}
                            className={styles.style}
                        />
                    </Form>
            </div>
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
    else{
        return (
            <div>Login to access settings</div>
        )
    }
}

export default SettingsPageLoggedInView;

