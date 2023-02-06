export class CreateCommentDto {
  content: string;

  userId;

  cardId;
}

export class UpdateCommentDto {
  content: string;

  userId: number;

  cardId: number;

  commentId: number;
}

export class UpdateCommentResponseDto {
  content: string;
}

export class CreateCommentResponseDto {
  content: string;
}
