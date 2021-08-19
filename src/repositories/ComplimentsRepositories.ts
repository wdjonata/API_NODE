import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";
import { Compliments } from "../entities/Compliments";

@EntityRepository(Compliments)
class ComplimentsRepositories extends Repository<Compliments> {}

export { ComplimentsRepositories };