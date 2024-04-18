import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { makeQuestion } from 'test/factories/make-question';
import { MockInstance } from 'vitest';
import { waitFor } from 'test/utils/wait-for';
import { OnQuestionBestAnswerChosen } from './on-question-best-answer-chosen';

let inMemoryAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnsertAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;

describe('On Question Best Answer Chosen', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryAttachmentsRepository
    );
    inMemoryAnsertAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnsertAttachmentsRepository
    );
    sendNotificationUseCase = new SendNotificationUseCase(
      new InMemoryNotificationsRepository()
    );

    // está espionando o método execute do sendNotificationUseCase
    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

    // cria o subscriber - começa a ouvir o evento a partir de uma nova answer criada
    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      sendNotificationUseCase
    );
  });

  it('should send a notification when topic has new best answer chosen', async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionsRepository.create(question);

    // envia a notificação da criação de uma nova answer
    inMemoryAnswersRepository.create(answer);

    question.bestAnswerId = answer.id;

    inMemoryQuestionsRepository.save(question);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
