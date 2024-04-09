import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { NotAllowedError } from './errors/not-allowed-error';

interface EditAnswerUseCaseRequest {
  authorId: string;
  content: string;
  answerId: string;
}

type EditAnswerUseCaseResponse = Either<
  NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) throw new Error('Answer not found');

    if (answer.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    answer.content = content;

    await this.answersRepository.save(answer);

    return right({ answer });
  }
}
