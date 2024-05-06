interface sendEmailLines {

    service: string, // gmail ou email etc
    user: string, 
    pass: string,
    from: string,  // Remetente
    to: string,    // Destinatario
    subject: string,   // Nome do email
    text: string,      // Mensagem do email
}

export {sendEmailLines}