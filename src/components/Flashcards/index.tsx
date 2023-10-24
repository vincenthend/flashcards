import * as React from 'react'
import { Card, Typography } from 'antd'
import { WordData } from '../../types'

interface Props {
  data: WordData
}

function Flashcards(props: Props): JSX.Element {
  const {data} = props
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    setVisible(false)
  }, [data]);


  return <div>
    <Card style={{width: '300px', height: '300px'}} bodyStyle={{height: '100%'}}>
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div><Typography.Text type={'secondary'} style={{fontSize: 10}}>ID: {data.id}</Typography.Text></div>
          <Typography.Text strong style={{fontSize: 36}}>{data.word}</Typography.Text>
        </div>

        <div onClick={() => setVisible(x => !x)}>
          {visible ? <Typography.Text type={'secondary'} style={{fontSize: 16}}>{data.description}</Typography.Text> : <div style={{backgroundColor: '#d7d7d7', width: '100%', height: 24}} />}
        </div>
      </div>
    </Card>
  </div>
}

export default Flashcards
