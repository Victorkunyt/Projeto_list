// LoginForm.tsx
import React, { useState } from 'react';
import './login.css'; 
import { Form, Button } from 'react-bootstrap';

const LoginForm: React.FC = () => {
  const [login, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para autenticar o usuário
  };

  

  return (
    <div className="login-container"> {}
      <h2>Seja Bem vindo!</h2>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="login"
            placeholder="Digite seu login"
            value={login}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

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
          Entrar
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
