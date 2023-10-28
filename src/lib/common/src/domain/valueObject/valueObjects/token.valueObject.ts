import { Email, ID } from '@common/domain';
import { InvalidTokenException } from '@common/exceptions';
import { TokenExpiredError, decode, sign, verify } from 'jsonwebtoken';

export class TokenPayload {
  private userId: ID;
  private email: Email;

  constructor(userId: ID, email: Email) {
    this.userId = userId;
    this.email = email;
  }

  public getUserId(): ID {
    return this.userId;
  }

  public getEmail(): Email {
    return this.email;
  }
}

export class Token {
  private value: string;
  private secretKey: string;
  private tokenPayload: TokenPayload;

  private constructor(secretKey: string, value: string) {
    this.secretKey = secretKey;
    this.value = value;
    this.tokenPayload = this.getTokenPayload();
  }

  public static generate(
    secretKey: string,
    userId: string,
    email: string,
  ): Token {
    const token = sign(
      {
        userId,
        email,
      },
      secretKey,
      {
        expiresIn: '24h',
      },
    );

    return new Token(secretKey, token);
  }

  public static reconstructor(secretKey: string, value: string): Token {
    const token = new Token(secretKey, value);
    if (!token.isValid()) {
      throw new InvalidTokenException();
    }

    return token;
  }

  private getTokenPayload(): TokenPayload {
    const tokenDecoded = decode(this.getValue(), {
      complete: true,
      json: true,
    }) as { [key: string]: any } | null;

    if (
      !tokenDecoded ||
      !tokenDecoded.payload ||
      !tokenDecoded.payload.userId ||
      !tokenDecoded.payload.email
    ) {
      throw new InvalidTokenException();
    }

    return new TokenPayload(
      new ID(tokenDecoded.payload.userId),
      new Email(tokenDecoded.payload.email),
    );
  }

  public getValue(): string {
    return this.value;
  }

  public isValid(): boolean {
    try {
      verify(this.getValue(), this.secretKey, { complete: true });

      return true;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new InvalidTokenException();
      }

      return false;
    }
  }

  public getUserId(): ID {
    return this.tokenPayload.getUserId();
  }

  public getEmail(): Email {
    return this.tokenPayload.getEmail();
  }
}
