// import axios from 'axios';
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// const getnewproducts = async (page,totalpages) => {
 
//   const api = new WooCommerceRestApi({
//     url: process.env.NEXT_PUBLIC_WOOCOMMERCE_BASE_URL,
//     consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
//     consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
//     version: "wc/v3"
//   });
//   // Increase per_page to reduce the number of requests
//   const perPage = 20;

//   // Fetch WooCommerce products in parallel with variations
//   const productsResponse = await api.get(`products?page=${page}&per_page=${perPage}`);

//   // Fetch all variations in parallel using Promise.all
//   const productsWithVariations = await Promise.all(
//     productsResponse.data.map(async (product) => {
//       if (product.variations.length > 0) {
//         try {
//           const { data: variations } = await api.get(`products/${product.id}/variations`, {
//             params: { per_page: 50 },
//           });
//           return { ...product, variations };
//         } catch (error) {
//           console.error(`Error fetching variations for ${product.name}:`, error.message);
//           return product;
//         }
//       } else {
//         return product;
//       }
//     })
//   );

//   console.log("dar",productsWithVariations)

//   // Use Promise.all to fetch Shopify products in parallel
//   const shopify_products = await Promise.all(
//     productsWithVariations.map(async (wpProduct) => {
//       try {
//         const response = await axios.get(`https://${process.env.NEXT_PUBLIC_SHOPIFY_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_SHOPIFY_PASSWORD_KEY}@${process.env.NEXT_PUBLIC_SHOPIFY_BASE_URL}/api/2024-07/products.json`, {
//           params: {
//             title: wpProduct.name,
//           },
//         });

//         const shopifyProduct = response.data.products[0] || null;
//         return { wpProduct, shopifyProduct };
//       } catch (error) {
//         console.error(`Error fetching Shopify product for ${wpProduct.name}:`, error.message);
//         return { wpProduct, shopifyProduct: null };
//       }
//     })
//   );

//   return {
   
//       newpages: {
//         productsWithVariations,
//         currentPage: parseInt(page, 10),
//         totalPages: parseInt(productsResponse.headers['x-wp-totalpages'], 10) || 1,
//         shopify_products,
//       },
    
//   };
// };

// export default getnewproducts;
