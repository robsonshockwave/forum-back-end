import { Slug } from './value-objects/slug';
import { Entity } from '../../core/entities/entities';

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
  slug: Slug;
}

export class Question extends Entity<QuestionProps> {
  // a classe Entity já está fazendo isso
  //   constructor(props: QuestionProps, id?: string) {
  //     super(props, id);
  //   }
}
