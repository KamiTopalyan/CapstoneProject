import styles from "../styles/Password.module.css";
import styleUtils from "../styles/utils.module.css";
import passwordStyles from "../styles/PasswordsPage.module.css"
import { Card } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Password as PasswordModel } from "../models/password";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";


interface PasswordProps {
    passwordModel: PasswordModel,
    onPasswordClicked: (password: PasswordModel) => void,
    onDeletePasswordClicked: (password: PasswordModel) => void,
    className?: string,
}

const Password = ({ passwordModel, onPasswordClicked, onDeletePasswordClicked, className }: PasswordProps) => {
    const {
        password,
        website,
        username,
        createdAt,
        updatedAt
    } = passwordModel;
    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card
            className={`${styles.passwordCard} ${className}`}
            >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.Row}>
                <Row className={styleUtils.width100}>
                <Col xs={4}>
                    <div className={styles.passwordText}>
                        Website: {website}
                    </div>
                </Col>
                <Col xs={4}>
                    <div className={styles.passwordText}>
                        Username: {username}
                    </div>
                </Col>
                <Col xs={4}>
                <div className={styles.passwordText}>
                    Password: {password}
                    </div>
                </Col>
                </Row>
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeletePasswordClicked(passwordModel);
                            e.stopPropagation();
                        }}
                    />
                    <AiFillEdit
                        className="text-muted"
                        onClick={() => onPasswordClicked(passwordModel)}
                    />
                </Card.Title>
                
                    
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Password;