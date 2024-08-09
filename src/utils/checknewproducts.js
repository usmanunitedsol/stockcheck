import { useState } from 'react';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
 
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_BASE_URL,
  consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3"
});

const getmoreproducts =async (page) => {
 

  
    
    const productsResponse = await api.get(`products?page=${page}&per_page=5`);
  
    // Fetch variations for each product with variations
    const productsWithVariations = await Promise.all(
      productsResponse?.data.map(async (product) => {
        if (product.variations.length > 0) {
          const { data: variations } = await api.get(`products/${product.id}/variations`, {
            params: {
              per_page: 50, // Adjust as needed
            },
          });
          return { ...product, variations };
        }
        return product;
      })
    );
  
    // Assume the API provides total pages in the response headers
    const totalPages = productsResponse.headers['x-wp-totalpages'] || 1;
    
    return {
     newpages : {
        products: productsWithVariations,
        currentPage: parseInt(page, 10), // Convert page to an integer
        totalPages: parseInt(totalPages, 10),
       
      },
    };
  
};

export default getmoreproducts;
