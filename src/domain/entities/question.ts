import { Slug } from './value-objects/slug';
import { Entity } from '../../core/entities/entities';

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
  slug: Slug;
}

export class Question extends Entity<QuestionProps> {
  //   constructor(props: QuestionProps, id?: string) {
  //     super(props, id);
  //   }
}
