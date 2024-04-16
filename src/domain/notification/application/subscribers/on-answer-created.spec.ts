import { makeAnswer } from 'test/factories/make-answer';
import { OnAnswerCreated } from './on-answer-created';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAttachmentsRepository
    );
  });

  it('should send a notification when an answer is created', () => {
    // cria o subscriber - começa a ouvir o evento a partir de uma nova answer criada
    const onAnswerCreated = new OnAnswerCreated();

    // cria uma nova answer
    const answer = makeAnswer();

    // envia a notificação da criação de uma nova answer
    inMemoryAnswersRepository.create(answer);
  });
});
