import { Entity } from '../../core/entities/entities';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  // a classe Entity já está fazendo isso
  //   constructor(props: InstructorProps, id?: string) {
  //     super(props, id);
  //   }

  static create(props: InstructorProps, id?: UniqueEntityID) {
    const instructor = new Instructor(
      {
        ...props,
      },
      id
    );

    return instructor;
  }
}
