'use client'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

// import styles from './Slider.module.scss'
import styles from '../../fb/fb.module.scss'


const Slider = (props) => {
    const { images } = props

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
          slideChanged() {
            // console.log('slide changed')
          },
        },
        [
          // add plugins here
        ]
      )
    
      return (
            <div ref={sliderRef} className={`${styles['fb__photo']} keen-slider`}>
                {images && images.map( (item, index) => <img src={item} key = {index} className="keen-slider__slide"></img>)}
            </div>
      )
    }


export default Slider