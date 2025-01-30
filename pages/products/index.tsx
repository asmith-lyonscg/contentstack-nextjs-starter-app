import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../../contentstack-sdk';
import { getPageRes, getProductListRes } from '../../helper';
import { Page, Products, PageUrl, Context } from "../../typescript/pages";
import GalleryReact from '../../components/gallery';

export default function ProductsPage({ page, products, pageUrl }: { 
  page: Page, 
  products: Products[], 
  pageUrl: PageUrl 
}) {
  const [getBanner, setBanner] = useState(page);
  const [getProducts, setProducts] = useState(products);
  
  async function fetchData() {
    try {
      const bannerRes = await getPageRes(pageUrl);
      const productsRes = await getProductListRes();
      if (!bannerRes) throw new Error('Status code 404');
      setBanner(bannerRes);
      setProducts(productsRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, []);

  return (
    <>
      <GalleryReact
        data={getProducts}
        heading={getBanner?.title}
        description={getBanner?.description}
        showFilter={false}
        showDescription
      />
    </>
  );
}

export async function getServerSideProps(context: Context) {
  try {
    const page = await getPageRes(context.resolvedUrl);
    const products = await getProductListRes();

    return {
      props: {
        pageUrl: context.resolvedUrl,
        page,
        products,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
