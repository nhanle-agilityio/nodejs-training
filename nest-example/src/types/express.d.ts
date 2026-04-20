import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    clerkUser?: {
      userId: string;
      role?: string;
    };
  }
}
