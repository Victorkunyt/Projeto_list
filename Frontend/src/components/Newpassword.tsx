 /* eslint-disable @typescript-eslint/no-unused-vars */
 import { useState } from 'react';
 import { Form, Button, Spinner } from 'react-bootstrap';
 import { Newpassword } from '../services/api';
import "./Newpassword.css"; // Importe o CSS aqui

 const NewPasswordPage = () => {
    const [userId, setuserId] = useState<string>("");
   const [password, setPassword] = useState('');
   const [newpassword, setnewpassword] = useState('');
   const [repeatNewpassword, setrepeatNewpassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');
   const [successMessage, setSuccessMessage] = useState('');

   const handleSubmit = async (e: { preventDefault: () => void; }) => {
     e.preventDefault();
     setError('');
     if (password !== confirmPassword) {
       setError('As senhas não coincidem.');
       return;
     }
     setIsLoading(true);
    try {
       const userid = localStorage.getItem("userid");
       await Newpassword(userid,password,newpassword,repeatNewpassword)
       setSuccessMessage('Senha redefinida com sucesso!');
       setPassword('');
       setConfirmPassword('');
     } catch (error) {
       setError('Ocorreu um erro ao redefinir a senha.');
     }
     setIsLoading(false);
   };

   return (
     <div className="password-reset-container"> {/* Atualize a classe aqui */}
       <h2>Redefinir Senha</h2>
       {error && <p className="error-message">{error}</p>}
       {successMessage && <p className="success-message">{successMessage}</p>}
       <Form onSubmit={handleSubmit}>
         <Form.Group controlId="formBasicPassword">
           <Form.Label>Senha Atual</Form.Label>
           <Form.Control
             type="password"
             placeholder="Digite sua senha atual"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </Form.Group>
         <Form.Group controlId="formBasicPassword">
         <Form.Label>Nova Senha</Form.Label>
           <Form.Control
             type="password"
             placeholder="Digite sua nova senha"
             value={newpassword}
             onChange={(e) => setPassword(e.target.value)}
           />
         </Form.Group>
         <Form.Group controlId="formBasicConfirmPassword">
           <Form.Label>Confirme a Nova Senha</Form.Label>
           <Form.Control
             type="password"
             placeholder="Confirme sua nova senha"
             value={repeatNewpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
           />
         </Form.Group>
         <Button variant="primary" type="submit">
           {isLoading ? (
             <Spinner animation="border" size="sm" />
           ) : (
            <>
               <Button onClick={() => window.location.href = '/login'}>Voltar ao Login</Button>
               <Button type="submit">Redefinir Senha</Button>
             </>
          )}
         </Button>
       </Form>
     </div>
   );
 };

 export default NewPasswordPage;
