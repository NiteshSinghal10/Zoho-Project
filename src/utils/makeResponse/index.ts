import { Response } from "express";

export const makeResponse = (res: Response, status: number, success: boolean, message: string, data: any = {}, meta: any = {}) => {
  return res.status(status).json({ success, data: data, message: message, meta: meta });
}