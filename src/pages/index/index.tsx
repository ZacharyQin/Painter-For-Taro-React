import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Painter from '../../components/common/painter'
import textPalette from '../../static/palette/texts';
import './index.scss'

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      painterRef: React.createRef()
    }
  }
  state: any;
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onImgOk(e){
    console.log('绘图成功，图片地址为：', e.path);
  }
  saveImg(){
    const { painterRef } = this.state;
    painterRef.current.saveImage();
  }
  render () {
    const { painterRef } = this.state;
    return (
      <View className='index'>
        <Button onClick={this.saveImg.bind(this)}>保存图片</Button>
        <Painter
          customStyle=''
          palette={(new textPalette()).palette()}
          onImgOK={this.onImgOk.bind(this)}
          onImgErr={(err)=>{console.error('绘制失败',err)}}
          ref={painterRef}
        />
      </View>
    )
  }
}

export default Index
