import { nanoid } from 'nanoid/async';

import { Message } from '../../../entities/Message';

import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { DatabaseResponseInterface } from '../../../frameworks/common/interfaces/DatabaseResponse.interface';
import { InDataBaseMessageRepository } from '../../../frameworks/persistance/InDatabaseMessageRepository';
import { InDataBaseUserRepository } from '../../../frameworks/persistance/InDataBaseUserRepository';
import { InDataBaseConversationRepository } from '../../../frameworks/persistance/InDatabaseConversationRepository';
import { NotifySocketService } from '../../../frameworks/externalService/NotifySocketService';

export default  (messageRepository: InDataBaseMessageRepository, userRepository: InDataBaseUserRepository, conversationRepository: InDataBaseConversationRepository, socketService: NotifySocketService) => ({

    Excute: async(
        idUser: string,
        body: string,
        idConversation: string
    ) => {

        body = body.trim();

        Object.entries({idUser, idConversation, body}).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        const findByidUser: DatabaseResponseInterface = await userRepository.findById(idUser);
        if(!findByidUser.data[0]) throw new ApplicationException('The User Does Not Exist.', 400);

        const findByIdConverasation: DatabaseResponseInterface = await conversationRepository.getByIdConversation(idConversation);
        if(!findByIdConverasation.data[0]) throw new ApplicationException('The Conversation Does Not Exist.', 400);

        const generatedID = 'message-'+ await nanoid();
        const now = new Date();

        const newMessage = new Message(generatedID,idUser, body, idConversation, true, now);

        const result = await messageRepository.create(newMessage);

        const conversation: any = findByIdConverasation.data[0];
        let idUserReceptor = "";

        (idUser === conversation.idUserOne) ? ( idUserReceptor = conversation.idUserTwo) : (idUserReceptor = conversation.idUserOne);
        const userSender: any = findByidUser.data[0];

        socketService.notififyMessage(idUserReceptor, userSender.userName);
        socketService.notififyConversation(idConversation, userSender.userName);
        
        return result;
    }
});
