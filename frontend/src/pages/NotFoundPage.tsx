import { useEffect, useState } from 'react';
import { Style as StyleModel } from '../models/style';
import * as StyleApi from "../network/style_api";

const NotFoundPage = () => {
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
        <div>
            <p>Page not found</p>
        </div>
    );
}

export default NotFoundPage;