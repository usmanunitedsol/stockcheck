import { useState } from 'react';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
 

const getStockOfShopify = (name,shopify_prod) => {
 

  const matchingVariant = shopify_prod?.variants?.find(variant => variant.title === name);

  if (matchingVariant) {
    // Return the inventory quantity of the matching variant
    return matchingVariant.inventory_quantity;
  }

  // Return 0 if no matching variant is found
  return 0;
  
};

export default getStockOfShopify;

