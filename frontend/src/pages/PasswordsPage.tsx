import { Container } from "react-bootstrap";
import PasswordsPageLoggedInView from "../components/PasswordsPageLoggedInView";
import PasswordsPageLoggedOutView from "../components/PasswordsPageLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/PasswordsPage.module.css";

interface PasswordsPageProps {
    loggedInUser: User | null,
}

const PasswordsPage = ({ loggedInUser }: PasswordsPageProps) => {
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