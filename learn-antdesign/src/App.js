import React, { PureComponent } from 'react'
import { PoweroffOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd'

export default class App extends PureComponent {
  render() {
    const loadings = true;
    return (
      <>
        <Space
          style={{
            width: '100%',
          }}
        >
          <Button type="primary" loading>
            Loading
          </Button>
          <Button type="primary" size="small" loading>
            Loading
          </Button>
          <Button type="primary" icon={<PoweroffOutlined />} loading />
        </Space>

        <Space
          style={{
            width: '100%',
          }}
        >
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
        </Space>
      </>
    )
  }
}
