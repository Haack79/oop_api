// errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { CustomError } from './CustomError'; // Assuming you have a custom error class

// Error handling middleware function
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error); // Log the error for debugging purposes

  if (error instanceof CustomError) {
    // If it's a custom error, return a custom error response
    return res.status(error.statusCode).json({ errors: error.serializeErrors() });
  }

  // For other errors, return a generic error response
  return res.status(500).json({ errors: [{ message: 'Something went wrong' }] });
};
