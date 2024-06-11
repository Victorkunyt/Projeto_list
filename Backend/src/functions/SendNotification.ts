import { PrismaClient } from "@prisma/client";

export async function registerNotification(prisma: PrismaClient, type: string, recipientId: string): Promise<void> {
    
    if (!recipientId.trim() || recipientId.length !== 24 || typeof recipientId !== 'string') {
        throw new Error('Erro ao registrar notificação: recipientId inválido.');
    }

    try {
        // Registrar a nova notificação
        const newNotification = await prisma.notification.create({
            data: {
              type: type,
              recipientId: recipientId,
              expiresAt: new Date(Date.now() + 1 * 60 * 1000) // Expira em 1 minuto
            }
        });
          
        console.log('Notificação registrada com sucesso:', newNotification);

        // Limpar notificações expiradas
        const now = new Date();
        const result = await prisma.notification.deleteMany({
            where: {
                expiresAt: {
                    lt: now // Excluir notificações onde expiresAt é menor que a data e hora atuais
                }
            }
        });

        console.log(`Notificações expiradas removidas: ${result.count}`);
        
    } catch (error) {
        throw new Error('Erro ao registrar notificação: erro ao criar a notificação no Prisma Client');
    }
}




// id: Identificador único da notificação.
// type: Tipo da notificação (por exemplo, "compartilhamento de tarefa").
// recipient: Usuário que receberá a notificação. Este campo está relacionado ao modelo User.
// recipientId: ID do usuário destinatário da notificação.
// timestamp: Data e hora em que a notificação foi criada.