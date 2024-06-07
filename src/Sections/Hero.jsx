import React from 'react';
import RoundedCard from './RoundedCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { ProductData } from '../Pages/ProductPage/ProductCard';
import { Categories } from './Data';


export default function Hero() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
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
              slidesToShow: 2,
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
    
    return (
        <div className='h-[300px] flex flex-col gap-3 py-5 px-5 lg:px-10'>
            <h1 className='text-2xl lg:text-3xl font-bold'>Explore Popular categories</h1>   
            <Slider {...settings}>
                {Categories.map((data, idx) => (
                    <RoundedCard key={idx} imgURL={data.imgUrl} name={data.name} />
                ))}
            </Slider>
        </div>
    );
}
