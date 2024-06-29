import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { makeResponse } from '../../utils/makeResponse';

export const addTimesheetValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = joi.object({
    data: joi.string()
    .required()
  });

  const { error } = schema.validate(req.body);
  
  if(error) {
    return makeResponse(res, 400, false, error.message);
  }

  next();
}