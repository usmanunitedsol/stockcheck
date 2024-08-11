// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const config = {
	maxDuration: 60,
  };

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_BASE_URL,
  consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3"
});


export default async function handler(req, res) {
	
	const responseData = {
		success: false,
		products: []
	}
    const varid = req.query.varid;
 
    console.log("vars", varid)
	// const { perPage } = req?.query ?? {};
	
	try {
		const { data } = await api.get(
			`products/${varid}/variations`,
			{
				per_page: 50
			}
		);

    console.log("api", data),
		
		responseData.success = true;
		responseData.products =  data;
		
		return res.json( responseData );
		
	} catch ( error ) {
		responseData.error = error.message;
        return	res.status( 500 ).json( responseData  );
	}
}
