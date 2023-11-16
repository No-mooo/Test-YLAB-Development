import "./Entrance.css";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useEffect } from "react";

async function checkUser(event) {
    event.preventDefault();

    const btn = event.target.querySelector("button");
    btn.setAttribute('disabled', true);

    const searchUser = await axios.get("/api/data", new FormData(event.target)).then(response => response.data).catch(err => false);
    searchUser ? alert("Вход выполен") : alert("Пользователь не найден"); 

    btn.removeAttribute("disabled");
}

export function Entrance() {
    useEffect(() => {
        const mock = new MockAdapter(axios);

        mock.onGet("/api/data").reply(200, {
            users: [{ id: 1, name: "John Josef" }],
        });

    }, []);

    return (
        <div className="signIn">
            <form onSubmit={checkUser}>
                <h2 className="signIn__title">Вход</h2>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Войти</button>
            </form>
        </div>
    )
}