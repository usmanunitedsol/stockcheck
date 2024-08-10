import axios from 'axios';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const getnewproducts = async (searchTitle = '',page) => {
  const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WOOCOMMERCE_BASE_URL,
    consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
    version: "wc/v3"
  });

  const productsResponse = await api.get(`products?search=${searchTitle}`);
  

  // Fetch variations for each product with variations

  const productsWithVariations = await Promise.all(
    productsResponse?.data.map(async (product) => {
      try {
        if (product.variations.length > 0) {
          const { data: variations } = await api.get(`products/${product.id}/variations`, {
            params: { per_page: 50 },
          });
          return { ...product, variations };
        } else {
          // No variations, return the product as is
          return product;
        }
      } catch (error) {
        console.error(`Error fetching variations for ${product.name}:`, error.message);
        // In case of an error, still return the product without variations
        return product;
      }
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
     
        shopify_products.push({
          wpProduct,
          shopifyProduct: shopifyProduct || null,
        });
      
    } catch (error) {
      console.error(`Error fetching Shopify product for ${wpProduct.name}:`, error.message);
    }
  }

  

  return {
    props: {
    newpages : {
    
      currentPage: parseInt(page, 10),
      totalPages: parseInt(productsResponse.headers['x-wp-totalpages'], 10) || 1,
      shopify_products,
  
    }
    },
  };
};

export default getnewproducts;
