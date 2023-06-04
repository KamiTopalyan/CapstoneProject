import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as PasswordApi from "../network/passwords_api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await PasswordApi.logout();
            onLogoutSuccessful();
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;