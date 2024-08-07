import Link from 'next/link'
import React from 'react'

const Dashboard = ({data}) => {
  return (
    <div className='container'>
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
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td class="px-6 py-4">
                                Silver
                            </td>
                            <td class="px-6 py-4">
                             4
                            </td>
                            <td class="px-6 py-4">
                                6
                            </td>
                            <td class="px-6 py-4">
                                6
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
          </div>
        </div>
    </div>
  )
}


export default Dashboard

