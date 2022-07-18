export class CreateUserDto {
  readonly addresses: string[];
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly amountInvested: number;
  readonly investments: Record<string, any>[];
}
