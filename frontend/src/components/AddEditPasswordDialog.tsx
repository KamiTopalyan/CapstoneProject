import { Button, Form, Modal } from "react-bootstrap";
import { UseFormClearErrors, UseFormTrigger, useForm } from "react-hook-form";
import { Password } from "../models/password";
import { PasswordInput } from "../network/passwords_api";
import * as PasswordsApi from "../network/passwords_api";
import TextInputField from "./form/TextInputField";
import PasswordInputField from "./form/PasswordInputField";



interface AddEditPasswordDialogProps {
    passwordToEdit?: Password,
    onDismiss: () => void,
    onPasswordSaved: (password: Password) => void,
}   

const AddEditPasswordDialog = ({ passwordToEdit, onDismiss, onPasswordSaved }: AddEditPasswordDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, clearErrors} = useForm<PasswordInput>({
        defaultValues: {
            password: passwordToEdit?.password || "",
            website: passwordToEdit?.website || "",
            username: passwordToEdit?.username || "",
            
        }
    });

    async function onSubmit(input: PasswordInput) {
        try {
            let passwordResponse: Password;
            if (passwordToEdit) {
                passwordResponse = await PasswordsApi.updatePassword(passwordToEdit._id, input);
            } else {
                passwordResponse = await PasswordsApi.createPassword(input);
            }
            onPasswordSaved(passwordResponse);
            window.location.reload()
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {passwordToEdit ? "Edit password" : "Add password"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditPasswordForm" onSubmit={handleSubmit(onSubmit)} >

                    <TextInputField
                        name="website"
                        label="Website"
                        type="website"
                        placeholder="Website"
                        register={register} 
                        registerOptions={{ required: "Required" }}
                        error={errors.website}
                        autoComplete="off"
                    />

                    <TextInputField
                        name="username"
                        label="Username / Email"
                        type="usernamearea"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                        autoComplete="off"
                    />
                    <PasswordInputField
                        password="password"
                        label="Password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        clearError={clearErrors as UseFormClearErrors<PasswordInput>}
                        error={errors.password}
                        autoComplete="off"
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditPasswordForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditPasswordDialog;