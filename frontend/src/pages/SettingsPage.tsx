import * as StyleApi from "../network/style_api";
import SettingsPageLoggedInView from "../components/SettingsPageLoggedInView";
import SettingsPageLoggedOutView from "../components/SettingsPageLoggedOutView";
import { useEffect, useState } from 'react';
import { Style as StyleModel } from '../models/style';
import { Container } from "react-bootstrap";
import { User } from "../models/user";

interface PasswordsPageProps {
    loggedInUser: User | null,
}

const SettingsPage = ({ loggedInUser }: PasswordsPageProps) => {
    return ( 
            <div>
                {loggedInUser
                    ? <SettingsPageLoggedInView />
                    : <SettingsPageLoggedOutView />
                }
        </div>
     );
}
 
export default SettingsPage;