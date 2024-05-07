/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { SendEmail } from '../services/api';
import "./Newpassword.css"; 
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const NewPasswordPage = () => {
  const [to, setTo] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!to.trim()) {
        setError("Por favor, preencha o campo email.");
        return;
      }
      // Chamar a função de envio de email com o email fornecido
      await SendEmail(to);
      setSuccessMessage('Email enviado com sucesso!');
    } catch (error) {
      setError('Email não encontrado no banco de dados.');
    }
    setIsLoading(false);
  };

  return (
    <div className="password-reset-container"> 
      <h2>Enviar</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicConfirmEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email" 
            placeholder="Digite seu email"
            value={to} 
            onChange={(e) => setTo(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>
              <Button onClick={() => window.location.href = '/login'}>Voltar ao Login</Button>
              <Button type="submit">Enviar</Button>
            </>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default NewPasswordPage;
