export class UpdateUserDto {
  username: string;

  email: string;

  password: string;

  userId: number;

  requestedUserId: number;
}

export class UpdateUserResponseDto {
  username: string;

  email: string;

  password: string;
}
