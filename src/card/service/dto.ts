export class CreateCardDto {
  name: string;

  theme: string;

  description: string;

  columnId: number;

  userId: number;
}

export class UpdateCardDto {
  name: string;

  theme: string;

  description: string;

  cardId: number;

  columnId: number;

  userId: number;
}

export class ResponseCardDto {
  name: string;

  theme: string;

  description: string;
}

export class ResponseUpdateCardDto {
  name: string;

  theme: string;

  description: string;
}
