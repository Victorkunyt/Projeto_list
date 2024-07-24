import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { LogType } from "../types/Login_types"

// Chave secreta para criptografia (deve ser de 32 bytes para aes-256-cbc)
const ENCRYPTION_KEY = crypto.createHash('sha256').update(String('chaveDeCriptografiaSegura123')).digest('base64').substr(0, 32);
const IV_LENGTH = 16; // Para aes-256-cbc, o IV tem 16 bytes

// Função para criptografar o payload
function encrypt(text: any) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Função para descriptografar o payload
function decrypt(text: any) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

class GeneratorTokenProvider {
    async execute(userData: LogType) {
        // Criptografa os dados do usuário
        const encryptedUserData = encrypt(JSON.stringify(userData));

        // Gera o token JWT com os dados criptografados
        const token = jwt.sign({ userData: encryptedUserData }, 'suaChaveSecreta', {
            expiresIn: '1m',
        });

        return token;
    }

    // Função para verificar e descriptografar o token
    verify(token: any) {
        try {
            const decoded: any = jwt.verify(token, 'suaChaveSecreta');
            const decryptedUserData = decrypt(decoded.userData);
            return JSON.parse(decryptedUserData);
        } catch (err) {
            throw new Error('Token inválido');
        }
    }
}

export { GeneratorTokenProvider };
