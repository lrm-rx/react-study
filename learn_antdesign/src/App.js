import React, { PureComponent } from 'react'
import moment from 'moment';

import { Button, DatePicker } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import HYHomeRecommend from './components/home/childCpns/home-recommend';


export default class App extends PureComponent {
  render() {
    const loadings = true;

    return (
      <>
        <HYHomeRecommend/>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading />
        <br />
        <Button type="primary" loading={loadings[0]}>
          Click me!
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
        >
          Click me!
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[2]}
        />
        <DatePicker defaultValue={moment('2015-06-06', "YYYY-MM-DD")}
                    allowClear={false}/>
      </>
    )
  }
}
