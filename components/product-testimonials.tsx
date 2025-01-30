// components/product-testimonials.tsx
import React from 'react';
import { Image } from "../typescript/action";
import parse from 'html-react-parser';

type AdditionalParam = {
  quote: string
}

type Testimonial = {
  title: string,
  url: string,
  stars: number,
  quote: string,
  avatar: Image,
  name: string,
  credential: string,
  $: AdditionalParam;
}

type ProductTestimonialsProps = {
  testimonials: [Testimonial];
}

export const ProductTestimonials: React.FC<ProductTestimonialsProps> = ({ testimonials }) => {
  return (
    <div className='product-testimonials-block'>
      {testimonials.length > 0 ? (
        <>
          <h2 className='product-testimonials-heading'>Testimonials</h2>
          <ul className='product-testimonials-list'>
            {testimonials.map((testimonial, index) => (
              <div className='product-testimonial' key={index}>
                {testimonial.stars ? (
                  <div className='product-testimonial-stars'>
                    {Array.from({ length: testimonial.stars }, (_, index) => (
                      <span className='product-testimonial-star' key={index}>⭐</span>
                    ))}
                  </div>
                ) : ''}
                {testimonial.quote && typeof testimonial.quote === 'string' ? (
                  <p {...testimonial.$?.quote as {}}>{parse(testimonial.quote)}</p>
                ) : ''}
                {testimonial.avatar || testimonial.name ? (
                  <div className='product-testimonial-footer-group'>
                    {testimonial.avatar ? (
                      <img
                        style={{width: '50px', height: '50px'}}
                        src={testimonial.avatar.url}
                        alt={testimonial.avatar.filename}
                      />
                    ) : ''}
                    <div className='product-testimonial-footer-group-right'>
                      {testimonial.name ? (
                        <div className='product-testimonial-name'>{testimonial.name}</div>
                      ) : ''}
                      {testimonial.credential ? (
                        <div className='product-testimonial-credential'>{testimonial.credential}</div>
                      ) : ''}
                    </div>
                  </div>
                ) : ''}
              </div>
            ))}
          </ul>
        </>
      ) : ''}
    </div>
  )
};

export default ProductTestimonials;
