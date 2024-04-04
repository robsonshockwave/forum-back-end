import { Entity } from '../../core/entities/entities';

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  // a classe Entity já está fazendo isso
  //   constructor(props: StudentProps, id?: string) {
  //     super(props, id);
  //   }
}
