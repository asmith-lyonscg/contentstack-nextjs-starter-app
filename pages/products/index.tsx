import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../../contentstack-sdk';
import { getPageRes, getProductListRes, getGalleryRes } from '../../helper';
import { Page, Products, PageUrl, Context } from "../../typescript/pages";
import Link from 'next/link';

export default function ProductsPage({ page, products }: { page: Page, products: Products[] }) {
  const [getProducts, setProducts] = useState(products);
  
  useEffect(() => {
    onEntryChange(() => {
      getProductListRes().then(setProducts);
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
      <div className="container-fluid products-stripe">
        <div className="container">
          <div className="products-grid">
            {getProducts?.map((product) => (
              <Link href={product.url} key={product.uid} className="product-card">
                <img 
                  src={product.product_image.url} 
                  alt={product.product_display_name} 
                />
                <h2 className="product-name">{product.product_display_name}</h2>
                {product.pricing && (
                  <div className="product-price">
                    ${Number(product.pricing).toLocaleString()}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: Context) {
  try {
    const page = await getGalleryRes(context.resolvedUrl);
    const products = await getProductListRes();

    if (!page || !products) {
      return { notFound: true };
    }

    return {
      props: { 
        page: JSON.parse(JSON.stringify(page)),
        products: JSON.parse(JSON.stringify(products)) 
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { notFound: true };
  }
}
