// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { WORD_LIST } from '../../constants/wordlist'
import { DictionaryEntry, WordData } from '../../types'
import axios from 'axios'

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
async function getDictionaryEntry(word: string) {
  const resp = await axios.get<DictionaryEntry[]>(URL + word)
  return resp.data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WordData>
) {
  const wordId = Number(req.query["id"])
  const wordData = WORD_LIST[wordId]

  let dictionaryData: DictionaryEntry[]
  try {
    dictionaryData = await getDictionaryEntry(wordData.word)
    return res.status(200).json({id: wordId, ...WORD_LIST[wordId], dictionary: dictionaryData[0]})
  } catch {
    console.warn(`Word definition not found ${wordData.word}`)
  }
}
