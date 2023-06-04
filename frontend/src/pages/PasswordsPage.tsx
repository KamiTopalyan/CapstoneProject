import { Container } from "react-bootstrap";
import PasswordsPageLoggedInView from "../components/PasswordsPageLoggedInView";
import PasswordsPageLoggedOutView from "../components/PasswordsPageLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/PasswordsPage.module.css";
import { useEffect, useState } from 'react';
import { Style as StyleModel } from '../models/style';
import * as StyleApi from "../network/style_api";
interface PasswordsPageProps {
    loggedInUser: User | null,
}

const PasswordsPage = ({ loggedInUser }: PasswordsPageProps) => {
    const [style, setStyle] = useState<StyleModel>();

    useEffect(() => {
        async function Style() {
            try {
                const styles = await StyleApi.fetchStyle();
                document.body.style.backgroundColor = styles.backgroundColor
                setStyle(styles)
            } catch (error) {
                console.error(error);
            }
        }
        Style();  
    }, []);

    return (
        <Container className={styles.passwordsPage}>
            <>
                {loggedInUser
                    ? <PasswordsPageLoggedInView />
                    : <PasswordsPageLoggedOutView />
                }
            </>
        </Container>
    );
}

export default PasswordsPage;