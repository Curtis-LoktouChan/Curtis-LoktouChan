import { history, useLocation } from 'umi'
import { FC, useState, useEffect } from 'react'
import { Layout, PageHeader } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'

import { UserCenterServices } from '@/services'
import { typeKeyValue } from '../sectionTypeWithIcon'

const ViewSection: FC = () => {
  const location = useLocation()
  // 获取小节信息
  const { data: sectionData, run: getSectionRequest } = useRequest(UserCenterServices.getSection, {
    manual: true,
    onSuccess: (res) => {
      console.log(res?.sectionContent)
    }
  })

  useEffect(() => {
    const { classID, ID, chapterID, sectionType } = (location as any)?.query.section
    getSectionRequest({
      classID,
      chapterID,
      sectionID: ID,
      sectionType
    })
  }, [])

  const handlePageBack = () => {
    history.push('/userCenter/myClassList')
  }

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <PageHeader
        style={{ backgroundColor: '#DDEEFF' }}
        backIcon={
          <div
            style={{ color: 'green' }}
            onClick={() => {
              history.goBack()
            }}
          >
            <RollbackOutlined />
            <p style={{ color: 'green' }}>返回</p>
          </div>
        }
        onBack={handlePageBack}
        title="添加小节"
        subTitle={(location as any)?.query?.section?.sectionTitle}
        extra={
          <div>
            {
              (location as any)?.query?.section?.sectionType &&
                typeKeyValue[(location as any)?.query?.section?.sectionType]({}) // 离谱的用法
            }
            {(location as any)?.query?.section?.sectionType}
          </div>
        }
      />
      <div dangerouslySetInnerHTML={{ __html: sectionData?.sectionContent! }}></div>
      <div style={{ height: '400px' }}></div>
    </Layout>
  )
}

export default ViewSection
