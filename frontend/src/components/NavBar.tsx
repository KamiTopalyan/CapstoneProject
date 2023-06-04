import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import style from "../styles/App.module.css"
import { Link } from "react-router-dom";
import * as StyleApi from "../network/style_api";
import { useEffect, useState } from 'react';
import { Style as StyleModel } from '../models/style';
interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    // eslint-disable-next-line
    const [styles, setStyle] = useState<StyleModel>(); 

    useEffect(() => {
        async function Style() {
            try {
                const styles = await StyleApi.fetchStyle();
                if(document.getElementById("navbar")) {
                    document.getElementById("navbar")!.style.backgroundColor = styles.navbarColor
                }
                setStyle(styles);
            } catch (error) {
                console.error(error);
            }
        }
        Style();  
    }, []);
    if(loggedInUser) {
        return (
            <Navbar id="navbar" className={style.navbar} variant="dark" expand="sm" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        Password Manager
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/settings">
                            Settings
                        </Nav.Link>
                    </Nav>
                    <Navbar.Toggle aria-controls="main-navbar" />
                    <Navbar.Collapse id="main-navbar">
                        <Nav className="ms-auto">
                            {loggedInUser
                                ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                                : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

    return (
        <Navbar className={style.navbar} variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Password Manager
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                            : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavBar;