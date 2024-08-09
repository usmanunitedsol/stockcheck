
import getmoreproducts from '@/utils/checknewproducts'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const Dashboard = ({ products , currentPage, totalPages, page, setCurrentPage }) => {
  console.log("prodn",products)



  const { isLoading, error, data } = useQuery(
    ['moreproducts', currentPage], // Unique key for the query
    () => getmoreproducts,
     // Fetch function
  );
  

  console.log("dad",data)

  if (isLoading) {
    return <div class="relative items-center block w-full  p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700 h-lvh">
    <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 ">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>; 
  }

  return (
    <div className='container m-auto'>
         <div className='p-8'>
           <div className='search_box'>    
              <form class="max-w-md mx-auto">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none " placeholder="Search Product by Sku"  required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-500  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-500">Search</button>
                </div>
              </form>
           </div>

           <div className='block_result flex gap-2 pt-5 justify-end'>
      
           <button type="submit" class="text-white  bg-blue-500 hover:bg-blue-500  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-500">Export list</button>

           </div>

          <div className='products_show pt-7'>                      
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      
                        <tr>
                            <th scope="col" class="px-6 py-3">
                               Title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Variant Title
                            </th>
                            <th scope="col" class="px-6 py-3">
                               Stock Volcano Vapes 
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Stock Vape Distribution Direct
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    
                    {
                  data.newpages.products.map((product) => {
                    return product.variations.map((item) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product.name}
                        </th>
                        <td className="px-6 py-4">
                          {item?.name}
                        </td>
                        <td className="px-6 py-4">
                          4
                        </td>
                        <td className="px-6 py-4">
                          {item ? ( item.stock_quantity ?  item.stock_quantity : 0): product.stock_quantity }
                        </td>
                        <td className="px-6 py-4">
                        {item ? ( item.stock_quantity ?  item.stock_quantity : 0): product.stock_quantity }
                        </td>
                      </tr>
                    ));
                  })
                }


                    </tbody>
                </table>
            </div>
            <div className="pagination-controls flex py-5 justify-center gap-4">
                    {currentPage > 1 && (
                        <Link className="text-white  bg-blue-500 hover:bg-blue-500  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-500" href={`/?page=${currentPage - 1}`}>
                        Previous
                        </Link>
                    )}
                    {currentPage < totalPages && (
                        <Link className="text-white  bg-blue-500 hover:bg-blue-500  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-500" href={`/?page=${currentPage + 1}`}>
                        Next
                        </Link>
                    )}
              </div>


          </div>
        </div>
    </div>
  )
}


export default Dashboard

