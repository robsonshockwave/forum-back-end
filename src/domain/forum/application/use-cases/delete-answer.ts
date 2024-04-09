import { Either, left, right } from '@/core/either';
import { AnswersRepository } from '../repositories/answers-repository';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<NotAllowedError, {}>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) throw new Error('answer not found');

    if (answer.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    await this.answersRepository.delete(answer);

    return right({});
  }
}
