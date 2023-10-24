// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { WORD_LIST } from '../../constants/wordlist'
import { WordData } from '../../types'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WordData>
) {
  const wordId = Number(req.query["id"])
  res.status(200).json({id: wordId, ...WORD_LIST[wordId]})
}
