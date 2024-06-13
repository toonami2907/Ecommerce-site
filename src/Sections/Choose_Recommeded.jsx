import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGlobalContext } from '../components/config/StateProvider';
import { Link } from 'react-router-dom';

export default function Choose_Recommeded() {
  const { product } = useGlobalContext()
  var settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  let product_slice = product?.slice(0, 6)
  return (
    <div className='px-5 py-5'>
      <h1 className='text-2xl font-semibold pl-1 pb-2 '>You may also Like</h1>
      <Slider {...settings}>
        {product_slice && product_slice.map((item, idx) => (
          <Link key={idx} to={`/about/${item._id}`} className='px-2'>
            <div className="aspect-h-1 aspect-w-1 lg:h-[300px]  overflow-hidden rounded-t-md bg-gray-200  ">
              <img src={item.image} alt="" className=' object-cover h-[240px]  lg:h-full w-full object-center transition duration-1000 transform hover:scale-105' />
            </div>
            <div className='py-2 space-y-1'>
              <h1 className='text-lg uppercase font-medium'>{item.name}</h1>
              <p className='text-red-700 text-sm'>Best selling</p>
              <div className='bg-gray-500 w-[200px] px-1'>
                <p className='text-gray-200'> {item.category}</p>
              </div>
              <h1 className='font-medium'>${item.price}</h1>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}
