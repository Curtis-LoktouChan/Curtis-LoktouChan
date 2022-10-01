import { FC, useEffect, useState } from 'react'
import { Layout, PageHeader, Input, List, Image, Collapse, Button, Pagination } from 'antd'
import { history } from 'umi'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'

import courseService from '@/services/courseCenter/index'
import { courseList } from '@/services/courseCenter/types'
import { useRequest } from 'ahooks'

const CourseShow: FC = () => {
  const { Panel } = Collapse
  const pageSize = 10
  const [courseList, setCourseList] = useState<courseList[]>()
  const [update, setUpdate] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [flag, setFlag] = useState('page')
  const { data: courseListInfo, run: getCourseList } = useRequest(courseService.getCourseList, {
    manual: true,
    onSuccess: (res) => {
      setCourseList(res.courseList)
    }
  })
  useEffect(() => {
    getCourseList({ pageNum, pageSize, searchText, flag })
  }, [update, pageNum, flag])
  //搜索
  const handleSeachOnClick = (e: any) => {
    setSearchText(e.target.value)
  }
  //分页
  const handlePageOnchange = (page: number) => {
    setPageNum(page)
    setFlag('page')
  }
  return (
    <Layout>
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <Header />
      </Layout.Content>
      <Layout.Content style={{ backgroundColor: 'white', margin: '30px,50px' }}>
        <div className={styles.courseShowCotent}>
          <div className={styles.courseShowHeader}>
            {' '}
            <PageHeader
              ghost={false}
              title="课程中心"
              subTitle="快选择加入班级吧！"
              extra={
                <Input.Search
                  placeholder="人工智能"
                  onChange={handleSeachOnClick}
                  onSearch={() => {
                    setUpdate(update + 1)
                    setPageNum(1)
                    setFlag('search')
                  }}
                ></Input.Search>
              }
            ></PageHeader>
          </div>
          <div className={styles.courseShowList}>
            <List
              dataSource={courseList}
              renderItem={(item, index) => (
                <List.Item style={{ margin: '10px 24px' }} key={index}>
                  <div style={{ marginRight: '20px' }}>
                    <Image
                      src={
                        item.img
                          ? `http://42.192.82.19:50000${item?.img}`
                          : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                      }
                      height={300}
                      width={450}
                    />
                  </div>
                  <List.Item.Meta
                    title={
                      <div style={{ marginLeft: '6px', fontWeight: 'bold', fontSize: '32px' }}>
                        {item.Title}
                      </div>
                    }
                    description={
                      <div>
                        {' '}
                        <Collapse defaultActiveKey={['0']}>
                          <Panel key={'0'} header="第一次课">
                            <p>授课老师：{item.Author}</p>
                            <p>开始时间：{item.created_at}</p>
                            <p>课程简介：{item.introduction}</p>
                          </Panel>
                        </Collapse>
                        <Button
                          shape="round"
                          size="large"
                          onClick={() =>
                            history.push({
                              pathname: '/courseIntroduce',
                              state: { courseInfo: item }
                            })
                          }
                        >
                          立即参加
                        </Button>
                      </div>
                    }
                  />
                </List.Item>
              )}
            ></List>
          </div>
          <div style={{ textAlign: 'center' }} className={styles.courseShowFooter}>
            <Pagination
              total={courseListInfo?.total}
              pageSize={pageSize}
              current={pageNum}
              defaultCurrent={1}
              onChange={(page) => {
                handlePageOnchange(page)
              }}
            ></Pagination>
          </div>
        </div>
      </Layout.Content>
      <Layout.Footer
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#f4fbff'
        }}
      >
        <Footer />
      </Layout.Footer>
    </Layout>
  )
}

export default CourseShow
