import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentsService {
    async execute({
        tag_id,
        user_sender,
        user_receiver,
        message
    }: IComplimentRequest) {
        const complimentRepository = getCustomRepository(ComplimentsRepositories);
        const userRepository = getCustomRepository(UsersRepositories);

        if (user_sender === user_receiver) {
            throw new Error("User Receiver Incorrect")
        }

        const userReceiverExists = await userRepository.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new Error("User Receiver does not exists!")
        }

        const compliment = complimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
            
        });

        await complimentRepository.save(compliment);

        return compliment;
    }
}

export { CreateComplimentsService }