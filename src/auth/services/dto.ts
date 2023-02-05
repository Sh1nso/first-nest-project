export class RegisterUserDto {
  username: string;

  email: string;

  password: string;
}

export class UserLoginRequestDto {
  email: string;

  password: string;
}

export class UserLoginResponseDto {
  username: string;

  password: string;

  email: string;

  token: string;
}

export class RegisterUserResponseDto {
  username: string;

  email: string;
}
