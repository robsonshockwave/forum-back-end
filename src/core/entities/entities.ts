import { UniqueEntityID } from './unique-entity-id';

export class Entity<T> {
  private _id: UniqueEntityID;
  protected props: T;

  get id(): UniqueEntityID {
    return this._id;
  }

  protected constructor(props: T, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID(id);
  }
}
