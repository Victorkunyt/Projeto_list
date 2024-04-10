/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { login, register } from "../services/api"; // Seu serviço de API
import CustomAlert from "../contexts/alertLogin"; // Seu componente de alerta
import "./login.css";

const LoginPage: React.FC = () => {
  const [, setIsLoggedIn] = useState(false);
  const [loginValue, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true); // Estado para controlar se está na tela de login
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cellphone, setCellphone] = useState<string>("");
  const [holderid, setHolderid] = useState<string>("");
  const [gender, setGender] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const specialCaracterRegex = /[@]/;

    try {
      if (isLogin) {
        if (!loginValue.trim()) {
          setError("Por favor, preencha o campo login.");
          return;
        }
        if (!password.trim()) {
          setError("Por favor, preencha o campo senha");
          return; 
        }
        const userData = await login(loginValue, password);
        console.log("Usuário autenticado:", userData);
        setIsLoggedIn(true);
        
        setSuccessMessage("Login bem-sucedido!");
      } else {

        if(!gender) {
          setError("Por favor, selecione o seu gênero")
          return;
        }
        if (!name.trim()) {
          setError("Por favor, preencha o campo nome");
          return;
        }
        if (!email.trim()) {
          setError("Por favor, preencha o campo email");
          return;
        }
        if (!specialCaracterRegex.test(email) || !email.includes(".")) {
          setError(`O Email precisa possuir (.,@)`);
          return;
        }
        if (!cellphone.trim()) {
          setError("Por favor, preencha o campo telefone");
          return;
        }
          if (cellphone.length !== 11) {
            setError(`O Numero de Celular tem que ter 11 Digitos`)
            return;
          }
        
        if (!holderid.trim()) {
          setError("Por favor, preencha o campo CPF")
          return;
        }

        if (!password.trim()) {
          setError("Por favor, preencha com uma senha válida")
          return;
        }
        const numericDigitRegex = /\d/;
        // eslint-disable-next-line no-useless-escape
        const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
      
        if (password.length < 8) {
          throw new Error('Senha precisa possuir pelo menos 8 caracteres');
        }
      
        if (!/[A-Z]/.test(password)) {
          throw new Error('Senha precisa possuir pelo menos 1 letra Maiúscula');
        }
      
        if (!/[a-z]/.test(password)) {
          throw new Error('Senha precisa possuir pelo menos 1 letra Minúscula');
        }
      
        if (!numericDigitRegex.test(password)) {
          throw new Error('Senha precisa possuir pelo menos um Digito Numérico');
        }
      
        if (!specialCharacterRegex.test(password)) {
          throw new Error('Senha precisa possuir pelo menos um caractere especial (e.g, !@#$%)');
        }
        const userData = await register(
          gender,
          name,
          email,
          cellphone,
          holderid,
          password
        );
        console.log("Usuário registrado:", userData);
        setSuccessMessage("Registro bem-sucedido! Faça o login agora.");
        setIsLogin(true); // Após o registro, mudando para a tela de login
      }
      setError("");
    } catch (error) {
      setError("Usuário não encontrado no banco de dados.");
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? "Login" : "Registro"}</h2>
      {error && <CustomAlert message={error} />}
      {successMessage && (
        <CustomAlert message={successMessage} type="success" />
      )}
      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <Form.Group controlId="formBasicGender">
              <Form.Label> </Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Selecione o gênero</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="Outros">Outros</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCellphone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu telefone"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicHolderid">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu CPF"
                value={holderid}
                onChange={(e) => setHolderid(e.target.value)}
              />
            </Form.Group>
          </>
        )}

        {isLogin && (
          <Form.Group controlId="formBasicLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu login"
              value={loginValue}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>
        )}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isLogin ? "Entrar" : "Registrar"}
        </Button>
      </Form>
      <Button variant="primary" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Registrar" : "Voltar ao Login"}
      </Button>
    </div>
  );
};

export default LoginPage;
