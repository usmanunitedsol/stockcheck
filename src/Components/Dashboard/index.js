
import getStockOfShopify from '@/utils/checknewproducts'
import getmoreproducts from '@/utils/checknewproducts'
import getnewproducts from '@/utils/getnewproduct'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import * as XLSX from 'xlsx';
import axios from "axios";
import { useRouter } from 'next/router';
const Dashboard = ({ products , currentPage, totalPages,shopify_products,comparedProducts,productsWithVariations }) => {
  console.log("prodn",shopify_products)
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);
  const [filterproducts , setFilterproducts]= useState (shopify_products);
  const [searchQuery, setSearchQuery] = useState('');
  const [cpage, setcpage] = useState(Number(query.page) || currentPage);
  const [totalpages,settotalpages]=useState(totalPages)

 
    // Helper function to convert ArrayBuffer to Base64
    const handleExportToExcel = () => {
      const table = document.getElementById('products-table');
      
      const ws = XLSX.utils.table_to_sheet(table);
      const newData = XLSX.utils.sheet_to_json(ws);
  
      const existingData = localStorage.getItem('excelData');
      let wb;
      let mergedData = [];
  
      if (existingData) {
          const existingArrayBuffer = safeBase64ToArrayBuffer(existingData);
          if (existingArrayBuffer) {
              wb = XLSX.read(existingArrayBuffer, { type: 'array' });
              const existingSheet = wb.Sheets['Products'];
              const existingJsonData = XLSX.utils.sheet_to_json(existingSheet);
  
              // Merge the existing data with the new data
              mergedData = [...existingJsonData, ...newData];
          } else {
              wb = XLSX.utils.book_new();
              mergedData = newData;
          }
      } else {
          wb = XLSX.utils.book_new();
          mergedData = newData;
      }
  
      const newWs = XLSX.utils.json_to_sheet(mergedData);
      
      // Remove the old sheet if it exists
      const sheetName = 'Products';
      if (wb.SheetNames.includes(sheetName)) {
          delete wb.Sheets[sheetName];
          wb.SheetNames = wb.SheetNames.filter(name => name !== sheetName);
      }
  
      // Append the new merged sheet
      XLSX.utils.book_append_sheet(wb, newWs, sheetName);
  
      // Write the workbook back to localStorage
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const base64Data = arrayBufferToBase64(wbout);
  
      localStorage.setItem('excelData', base64Data);
  
      // Optionally, download the file
      XLSX.writeFile(wb, 'products-list.xlsx');
  };
  
  // Helper functions for base64 encoding/decoding
  const arrayBufferToBase64 = (buffer) => {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
  };
  
  const base64ToArrayBuffer = (base64) => {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
  };
  
  const safeBase64ToArrayBuffer = (base64) => {
      try {
          return base64ToArrayBuffer(base64);
      } catch (e) {
          console.error("Failed to decode base64 string:", e);
          return null;
      }
  };

  const handlePageChange = async (newPage) => {
    try {
      setcpage(newPage);
      
      const response = await axios.get(`/api/get-products`, {
        params: { page: newPage } // Pass the new page as a query parameter
      });
     
      const { shopify_products, currentPage, totalPages } = response.data;
  
      setFilterproducts( response.data.shopify_products);
      setcpage(response.data.currentPage);
      settotalpages(response.data.totalPages);
      console.log("res",filterproducts)
    } catch (error) {
      console.error("Error fetching new products:", error.message);
    }
  };

  return (
    <div className='main_container'>
         <div className='p-8'>
           {/* <div className='search_box'>    
           <form className="max-w-md mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={searchQuery}
              
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                placeholder="Search Product by Sku"
                required
              />
              <button
                type="submit"
                
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-500"
              >
                Search
              </button>
            </div>
          </form>
           </div> */}  

           <div className='block_result '>
      
           <button type="submit" class="primary_btn" onClick={handleExportToExcel}>Export list</button>

           </div>

          <div className='products_show '>                      
            <div class="table_outer ">
                <table  id="products-table" class="table_inner">
                    <thead class="tablehead">
                      
                        <tr>
                            <th scope="col" class="">
                               Title
                            </th>
                            <th scope="col" class="">
                                Variant Title
                            </th>
                            <th scope="col" class="">
                               shopify stock
                            </th>
                            <th scope="col" class="">
                               wordpress stock
                            </th>
                            <th scope="col" class="">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    
                    {
             filterproducts &&    filterproducts.map((product) => {
                    return product.wpProduct.variations?.map((item) => (
                      <tr className="" key={item.id}>
                        <th scope="row" className="">
                          {product.wpProduct.name}
                        </th>
                        <td className="px-6 py-4">
                          {item?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          { getStockOfShopify(item?.name, product.shopifyProduct)}
                        </td>
                        <td className="px-6 py-4">
                          {item ? ( item.stock_quantity ?  item.stock_quantity : 0): product.stock_quantity }
                        </td>
                        <td className="px-6 py-4">
                        { getStockOfShopify(item?.name, product.shopifyProduct)   + (item ? ( item.stock_quantity ?  item.stock_quantity : 0): product.stock_quantity) }
                        </td>
                      </tr>
                    ));
                  })
                }


                    </tbody>
                </table>
            </div>
            <div className="pagination-controls btns_block">
        {cpage > 1 && (
          <button
            className="primary_btn"
            onClick={() => handlePageChange(cpage - 1)}
          >
            Previous
          </button>
        )}
        {cpage < totalpages && (
          <button
            className=" primary_btn"
            onClick={() => handlePageChange(cpage + 1)}
          >
            Next
          </button>
        )}
      </div>


          </div>
        </div>
    </div>
  )
}


export default Dashboard

