import prismaClient from "../../src/prisma";

export async function registerNotification(type: string, recipientId: any): Promise<void> {

    if (!recipientId.trim() || recipientId.length !== 24 || typeof recipientId !== 'string') {
        throw new Error('Erro ao registrar notificação: recipientId inválido.');
    }
 
     const ErroNotification = await prismaClient.notification.create({
      data: {
        type,
        recipientId
      }
    });

    if(!ErroNotification){
        throw new Error('Erro ao registrar notificação: erro ao criar a notificação no prisma cliente');

    }
    console.log('Notificação registrada com sucesso.');

  
}


// id: Identificador único da notificação.
// type: Tipo da notificação (por exemplo, "compartilhamento de tarefa").
// recipient: Usuário que receberá a notificação. Este campo está relacionado ao modelo User.
// recipientId: ID do usuário destinatário da notificação.
// timestamp: Data e hora em que a notificação foi criada.