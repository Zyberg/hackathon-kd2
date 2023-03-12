declare global {
  namespace Express {
    // For session
    interface User {
      email: string;
      id: number;
    }
  }
}

export default {};