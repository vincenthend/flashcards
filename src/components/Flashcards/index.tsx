import * as React from 'react'
import { Card, Empty, Skeleton, Space, Typography } from 'antd'
import { Meaning, WordData } from '../../types'

interface Props {
  data: WordData
}

function MeaningLayout(props: { meaning: Meaning }) {
  const {meaning} = props
  return <>
    <div>
      <div>
        <Typography.Text type={'secondary'} style={{fontSize: 14}}>
          {meaning?.definitions[0].definition}
        </Typography.Text>
      </div>
    </div>
  </>
}

function WordFlashcard(props: Props): JSX.Element {
  const {data} = props
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    setVisible(false)
  }, [data]);

  const cardContent = data ? (<div style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }}>
    <div>
      <div><Typography.Text type={'secondary'}
        style={{fontSize: 10}}>ID: {data.id}</Typography.Text></div>
      <div>
        <Typography.Text strong
          style={{fontSize: 36}}>{data.word}</Typography.Text>
      </div>
      <div>
        <Typography.Text
          style={{fontSize: 12}}>{data.dictionary?.phonetic}</Typography.Text>
      </div>
    </div>

    <div onClick={() => setVisible(x => !x)} style={{cursor: 'pointer'}}>
      <Skeleton loading={!visible}>
        {data.dictionary ? <>
            {data.dictionary?.meanings.map((meaning, idx) => <div
              key={`${data.id}_${idx}`}
              style={{display: 'flex'}}
            >
              <sup style={{marginRight: '8px'}}>{idx + 1}</sup>
              <MeaningLayout
                meaning={meaning}/>
            </div>)}
          </>
          :
          <Empty description={'No dictionary data found'}/>}
      </Skeleton>
    </div>
  </div>) : null

  return <div>
    <Card style={{width: '300px', height: '300px'}}
      bodyStyle={{height: '100%'}}>
      {cardContent}
    </Card>
  </div>
}

export default WordFlashcard
