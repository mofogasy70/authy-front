import { Button } from "antd";
import { useState } from "react";
interface ILogWith {
    callback: Function;
    AppID: string;
    style?: Object;
}
const LogWith: React.FC<ILogWith> = ({ style, AppID, callback }) => {
    const [accessToken, setaccessToken] = useState();
    function Authentification() {
        const fenetreEnfant = window.open('http://localhost:5173/LoginWith/' + AppID, '_blank', 'width=300,heigth=200');
        fenetreEnfant?.localStorage.setItem("AppID", JSON.stringify(AppID));
        window.addEventListener('message', async (event) => {
            setaccessToken(event.data);
            callback(await getUserData());
        });
    }
    async function getUserData() {
        const url = "http://localhost:5000/ExchangeToken";
        const data = { accessToken: accessToken };

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => {
                throw new Error(error);
            });
    }
    return (
        <Button style={style} onClick={Authentification}></Button>
    );
}
export default LogWith;