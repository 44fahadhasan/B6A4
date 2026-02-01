declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        pharmacieId: string | null | undefined;
      };
    }
  }
}
