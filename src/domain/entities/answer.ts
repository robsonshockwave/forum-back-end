import { Entity } from '../../core/entities/entities';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';
import { Optional } from '../../core/types/optional';

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

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return answer;
  }
}
