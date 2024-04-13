import { DomainEvent } from '../events/domain-event';
import { DomainEvents } from '../events/domain-events';
import { Entity } from './entities';

export abstract class AggregateRoot<Props> extends Entity<Props> {
  // anotar eventos que o agregado disparou
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    // anotar o evento no agregado
    this._domainEvents.push(domainEvent);
    // marcar o agregado para despacho
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
