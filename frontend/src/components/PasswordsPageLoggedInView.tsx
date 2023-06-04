import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Password as PasswordModel } from '../models/password';
import * as PasswordsApi from "../network/passwords_api";
import styles from "../styles/PasswordsPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditPasswordDialog from "./AddEditPasswordDialog";
import Password from './Password';
import { Style as StyleModel } from '../models/style';
import * as StyleApi from "../network/style_api";

const PasswordsPageLoggedInView = () => {

    const [passwords, setPasswords] = useState<PasswordModel[]>([]);
    const [passwordsLoading, PasswordsLoading] = useState(true);
    const [showPasswordsLoadingError, setPasswordsLoadingError] = useState(false);

    const [showAddPasswordDialog, setShowAddPasswordDialog] = useState(false);
    const [passwordToEdit, setPasswordToEdit] = useState<PasswordModel | null>(null);

    useEffect(() => {
        async function Passwords() {
            try {
                setPasswordsLoadingError(false);
                PasswordsLoading(true);
                const passwords = await PasswordsApi.fetchPasswords();
                setPasswords(passwords);
            } catch (error) {
                console.error(error);
                setPasswordsLoadingError(true);
            } finally {
                PasswordsLoading(false);
            }
        }
        Passwords();
    }, []);

    const [style, setStyle] = useState<StyleModel>();

    useEffect(() => {
        async function Style() {
            try {
                const style = await StyleApi.fetchStyle();
                if(document.querySelector("." + styles.password)) {
                    document.querySelectorAll("." + styles.password).forEach((passwordBox, index) => {
                        (passwordBox as HTMLElement).style.backgroundColor = style.passwordColor
                    })
                setStyle(style);
                }
            } catch (error) {
                console.error(error);
            }
        }
        Style();  
    }, []);
    
    function updateNewPassword() {
        
    }
    async function deletePassword(password: PasswordModel) {
        try {
            await PasswordsApi.deletePassword(password._id);
            setPasswords(passwords.filter(existingPassword => existingPassword._id !== password._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const passwordsGrid =
        <Row className={`g-4 ${styles.passwordsGrid}`}>
            {passwords.map(password => (
                <div key={password._id} id={password._id}>
                    <Password
                        passwordModel={password}
                        className={styles.password}
                        onPasswordClicked={setPasswordToEdit}
                        onDeletePasswordClicked={deletePassword}
                    />
                </div>
            ))}
        </Row>

    return (
        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddPasswordDialog(true)}>
                <FaPlus />
                Add new password
            </Button>
            {passwordsLoading && <Spinner animation='border' variant='primary' />}
            {showPasswordsLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!passwordsLoading && !showPasswordsLoadingError &&
                <>
                    {passwords.length > 0
                        ? passwordsGrid
                        : <p>You don't have any passwords yet</p>
                    }
                </>
            }
            {showAddPasswordDialog &&
                <AddEditPasswordDialog
                    onDismiss={() => setShowAddPasswordDialog(false)}
                    onPasswordSaved={(newPassword) => {
                        setPasswords([...passwords, newPassword]);
                        setShowAddPasswordDialog(false);
                    }}
                />
            }
            {passwordToEdit &&
                <AddEditPasswordDialog
                    passwordToEdit={passwordToEdit}
                    onDismiss={() => setPasswordToEdit(null)}
                    onPasswordSaved={(updatedPassword) => {
                        setPasswords(passwords.map(existingPassword => existingPassword._id === updatedPassword._id ? updatedPassword : existingPassword));
                        setPasswordToEdit(null);
                    }}
                />
            }
        </>
    );
}

export default PasswordsPageLoggedInView;