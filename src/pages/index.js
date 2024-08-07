import Image from "next/image";
import { Inter } from "next/font/google";
import Dashboard from "@/Components/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({data}) {
  console.log(data)
  return (
     <main>
      <Dashboard/>
     </main>
  );
}

export async function getServerSideProps(context) {
  
  try {
      const auth = {
          username:process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
          password:process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET
        };

      const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_BASE_URL}/products`,{auth})
      const data = await res.json()
     
      console.log("sadsad",data)
     
      return {
        props: {data:data}, 
      }
  } catch (error) {
     
      console.error('Error fetching products:', error);
      return {
        props: {data:null}, 
      }
  }

}