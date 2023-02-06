export class CreateColumnDto {
  name: string;

  description?: string;

  userId;
}

export class UpdateColumnDto {
  name: string;

  description?: string;

  columnId: number;

  userId;
}

export class CreateColumnResponseDto {
  name: string;

  description: string;
}

export class UpdateColumnResponseDto {
  name: string;

  description?: string;
}
