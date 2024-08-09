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
  
  const productsResponse = await api.get(`products?page=1&per_page=5`);

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
    props: {
    newpages : {
      products: productsWithVariations,
      currentPage: parseInt(page, 10), // Convert page to an integer
      totalPages: parseInt(totalPages, 10),
  
    }
    },
  };
}
