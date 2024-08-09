import Image from "next/image";
import { Inter } from "next/font/google";
import Dashboard from "@/Components/Dashboard";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import axios from "axios";
import handler from "./api/get-products";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useState } from "react";

const queryClient = new QueryClient()


const inter = Inter({ subsets: ["latin"] });

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_BASE_URL,
  consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3"
});

export default function Home({newpages}) {
  const [page, setCurrentPage] = useState(newpages && newpages?.currentPage)

  return (
     <main>
      <Dashboard {...newpages} page={page} setCurrentPage={setCurrentPage}  />
     </main>
  );
}

export async function getServerSideProps(context) {
  const {page=1} = context.query
  
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

  // GET SHOPIFY PRODUCTS
  let shopify_products = []

   // Loop through WooCommerce products and check each on Shopify
   for (const wpProduct of productsWithVariations) {
    try {
      // Fetch product from Shopify using title or SKU (depending on your data structure)
      const response = await axios.get(`https://${process.env.NEXT_PUBLIC_SHOPIFY_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_SHOPIFY_PASSWORD_KEY}@${process.env.NEXT_PUBLIC_SHOPIFY_BASE_URL}/api/2024-07/products.json`, {
        params: {
          title: wpProduct.name, // Adjust if necessary to use a SKU or other identifier
        },
      });

      const shopifyProduct = response.data.products[0]; // Assuming you get an array of products

      // If a matching product is found on Shopify, push it to the array
      if (shopifyProduct) {
        shopify_products.push({
          wpProduct,
          shopifyProduct,
        });
      }
    } catch (error) {
      console.error(`Error fetching Shopify product for ${wpProduct.name}:`, error.message);
    }
  }

  // try {
  //   const response= await axios.get(`https://${process.env.NEXT_PUBLIC_SHOPIFY_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_SHOPIFY_PASSWORD_KEY}@${ process.env.NEXT_PUBLIC_SHOPIFY_BASE_URL}/api/2024-07/products.json`)
  //    shopify_products = response.data.products;
  //   console.log('Products:', shopify_products);
 
  // } catch (error) {
  //      console.error( "shopifyproducts",error.message)
    
  // }

// Compare Products by Name and Stock Quantity
// const comparedProducts = productsWithVariations.map((wpProduct) => {
//   const matchingShopifyProduct = shopify_products.find(
//     (sp) => sp.title.toLowerCase() === wpProduct.name.toLowerCase()
//   );

//   return {
//     name: wpProduct.name,
//     wpStock: wpProduct.stock_quantity || wpProduct.variations?.reduce((sum, variation) => sum + (variation.stock_quantity || 0), 0) || 0,
//     shopifyStock: matchingShopifyProduct ? matchingShopifyProduct.variants.reduce((sum, variant) => sum + variant.inventory_quantity, 0) : 0,
//   };
// });

  return {
    props: {
    newpages : {
      productsWithVariations, // This will contain the product name and their respective stock from both WooCommerce and Shopify
      currentPage: parseInt(page, 10),
      totalPages: parseInt(productsResponse.headers['x-wp-totalpages'], 10) || 1,
      shopify_products,
  
    }
    },
  };
}
