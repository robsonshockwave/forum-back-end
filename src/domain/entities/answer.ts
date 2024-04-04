import { Entity } from '../../core/entities/entities';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';

interface AnswerProps {
  content: string;
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content;
  }

  // a classe Entity já está fazendo isso
  //   constructor(props: AnswerProps, id?: string) {
  //     super(props, id);
  //   }
}
