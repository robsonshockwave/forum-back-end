import { Slug } from './value-objects/slug';
import { Entity } from '../../core/entities/entities';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';

interface QuestionProps {
  title: string;
  content: string;
  authorId: UniqueEntityID;
  slug: Slug;
  bestAnswerId?: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  // a classe Entity já está fazendo isso
  //   constructor(props: QuestionProps, id?: string) {
  //     super(props, id);
  //   }
}
