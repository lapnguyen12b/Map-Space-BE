import { Request } from 'express'

export function getLoggerFillter(req: Request, data: string): string {
  const dataLog = `Filter - ${data} - ${req.url}`
  return dataLog
}