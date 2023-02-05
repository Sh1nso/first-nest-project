export class CreateColumnDto {
  name: string;

  description?: string;

  userId: number;
}

export class UpdateColumnDto {
  name: string;

  description?: string;

  columnId: number;

  userId: number;
}

export class CreateColumnResponseDto {
  name: string;

  description: string;
}

export class UpdateColumnResponseDto {
  name: string;

  description?: string;
}
