export interface WordData {
  id: number
  word: string
  description: string
  dictionary?: DictionaryEntry
}

export interface DictionaryEntry {
  word: string
  phonetic: string
  phonetics: any[]
  meanings: Meaning[]
  sourceUrls: string[]
}

export interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: string[]
}

export interface Definition {
  definition: string
  synonyms: any[]
  antonyms: any[]
  example: string
}