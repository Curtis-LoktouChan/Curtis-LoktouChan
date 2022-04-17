import { FC } from 'react'
import { Carousel, Image } from 'antd'

import carousel1 from '@/assets/carousels/carousel1.jpg'
import carousel2 from '@/assets/carousels/carousel2.jpg'
import carousel3 from '@/assets/carousels/carousel3.jpg'
import carousel4 from '@/assets/carousels/carousel4.jpg'

const MyCarousel: FC = () => {
  return (
    <Carousel autoplay>
      {/* <Image src="src/assets/carousels/carousel1.jpg" preview={false}/>
      <Image src="src/assets/carousels/carousel2.jpg" preview={false}/>
      <Image src="src/assets/carousels/carousel3.jpg" preview={false}/>
      <Image src="src/assets/carousels/carousel4.jpg" preview={false}/> */}
      <Image src={carousel1} preview={false} />
      <Image src={carousel2} preview={false} />
      <Image src={carousel3} preview={false} />
      <Image src={carousel4} preview={false} />
    </Carousel>
  )
}

export default MyCarousel
