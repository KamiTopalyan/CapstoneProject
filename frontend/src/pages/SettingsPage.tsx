import style from "../styles/settings.module.css"
import * as StyleApi from "../network/style_api";
import { Style as StyleModel } from "../models/style";
import { useEffect, useState } from 'react';
import SettingsPageLoggedInView from "../components/SettingsPageLoggedInView";


const SettingsPage = () => {

    return ( 
        <div>
<SettingsPageLoggedInView/>
        </div>
     );
}
 
export default SettingsPage;