import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../../contentstack-sdk';
import { getProductSingleRes } from '../../helper';
import { Products, PageUrl } from "../../typescript/pages";
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import ProductSpecs from '../../components/product-specs';
import Link from 'next/link';
import ProductTestimonials from '../../components/product-testimonials';

export default function ProductPost({ productPost, pageUrl }: { 
  productPost: Products, 
  pageUrl: PageUrl 
}) {
  const [getProduct, setProduct] = useState(productPost);
  
  async function fetchData() {
    try {
      const entryRes = await getProductSingleRes(pageUrl);
      if (!entryRes) throw new Error('Status: 404');
      setProduct(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, []);

  const renderModularPDP = (switchData: any[], modules: any, index: number) => {
    let formattedSpecs, formattedTestimonials;
    switch (switchData[0]) {
      case 'specs':
        formattedSpecs = modules?.specs?.specs.map((spec: any) => ({
          spec_value: spec.spec_value,
          spec_unit: spec.spec_unit,
          spec_label: spec.spec_label,
        }));
        return <ProductSpecs specs={formattedSpecs} key={`specs${index}`} />;
      case 'testimonials':
        formattedTestimonials = modules?.testimonials?.testimonial.map((testimonial: any) => ({
          title: testimonial?.title,
          url: testimonial?.url,
          stars: testimonial?.stars,
          quote: testimonial?.quote,
          avatar: testimonial?.avatar_image,
          name: testimonial?.name,
          credential: testimonial?.credential,
        }));
        return <ProductTestimonials testimonials={formattedTestimonials} key={`testimonial${index}`} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='breadcrumb container'>
        <div className="row">
          <div className="col-12">
            <Link href='/'>Home</Link>
            <span className='breadcrumb-divider'></span>
            <Link href='/products'>Products</Link>
            <span className='breadcrumb-divider'></span>
            <h1>{getProduct?.product_display_name}</h1>
          </div>
        </div>
      </div>
      <div className='container product-detail-container'>
        <div className="product-main">
          {getProduct?.product_image && (
            <img 
              src={getProduct.product_image.url} 
              alt={getProduct.product_display_name} 
              className="product-image"
            />
          )}
          <div className="product-description">
            {getProduct && getProduct.product_description ? (
              <div {...getProduct.$?.product_description as {}}>{parse(getProduct.product_description)}</div>
            ) : (
              <Skeleton height={400} />
            )}
          </div>
        </div>
        {getProduct?.modular_pdp_layout?.map((ele, index) => 
          renderModularPDP(Object.keys(ele), ele, index)
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  try {
    const productRes = await getProductSingleRes(`/products/${params.product}`);
    if (!productRes) throw new Error('404');

    return {
      props: {
        pageUrl: `/products/${params.product}`,
        productPost: productRes,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
