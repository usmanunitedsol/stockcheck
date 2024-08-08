import Image from "next/image";
import { Inter } from "next/font/google";
import Dashboard from "@/Components/Dashboard";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import axios from "axios";
import handler from "./api/get-products";

const inter = Inter({ subsets: ["latin"] });

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_BASE_URL,
  consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3"
});

export default function Home({variations}) {

  return (
     <main>
      <Dashboard products={variations} />
     </main>
  );
}

export async function getServerSideProps(context) {



  const productsResponse = await api.get('products', {
    per_page: 15, // Adjust per_page as needed, max 100
  });



  // Step 2: Fetch variations for each product with variations
  const productsWithVariations = await Promise.all(productsResponse?.data.map(async (product) => {
    if (product.variations.length > 0) {
      const { data: variations } = await api.get(`products/${product.id}/variations`, {
        per_page: 50, // Adjust as needed
      });
      return { ...product, variations };
    }
    return product;
  }));
 

    return {
      props: {variations: productsWithVariations } || {}, 
    };
  
}
