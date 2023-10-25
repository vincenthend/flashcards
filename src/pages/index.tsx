import Head from 'next/head'
import WordFlashcard from '../components/Flashcards'
import { Button, Space, Spin } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { WORD_COUNT } from '../constants/wordlist'
import { WordData } from '../types'
import axios from 'axios'

interface WordHistory {
  word: WordData
}

export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [wordHistory, setWordHistory] = React.useState<WordHistory[]>([]);
  const [currentWord, setCurrentWord] = React.useState<number>(0);

  const loadData = React.useCallback(async () => {
      try {
        setLoading(true)
        const id = Math.floor(Math.random() * WORD_COUNT)
        const resp = await axios.get<WordData>(`/api/data?id=${id}`)
        setWordHistory(history => [...history, {word: resp.data}])
      } finally {
        setLoading(false)
      }

    },
    [],
  );

  React.useEffect(() => {
    loadData()
  }, []);


  const handlePrev = React.useCallback(() => {
      setCurrentWord((currentWord) => currentWord - 1)
    },
    [],
  );


  const handleNext = React.useCallback(async () => {
      if(!wordHistory[currentWord + 1]) {
        await loadData()
      }
      setCurrentWord((currentWord) => currentWord + 1)
    },
    [currentWord, loadData, wordHistory],
  );


  return (
    <div>
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="Quick Vocabulary Flashcards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Space style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'gray'}} size={16}>
        <div>
          <Spin spinning={loading}>
            <WordFlashcard data={wordHistory[currentWord]?.word} />
          </Spin>
        </div>
        <div>
          <Space size={16} >
            <Button size={'large'} shape={'circle'} onClick={handlePrev}>
              <LeftOutlined />
            </Button>
            <Button size={'large'} shape={'circle'} onClick={handleNext}>
              <RightOutlined />
            </Button>
          </Space>
        </div>
      </Space>
    </div>
  )
}
