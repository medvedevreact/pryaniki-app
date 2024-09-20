import React, { useEffect, useState } from "react";
import styles from "./Auth.module.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export const Auth: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = useAppSelector((state) => state.user.token);
  console.log(token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Авторизация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Логин</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Введите логин"
            className={styles.input}
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Введите пароль"
            className={styles.input}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className={styles.button}>
          Войти
        </button>
      </form>
    </div>
  );
};
