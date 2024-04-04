import { Entity } from '../../core/entities/entities';

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  // a classe Entity já está fazendo isso
  //   constructor(props: InstructorProps, id?: string) {
  //     super(props, id);
  //   }
}
