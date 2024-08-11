import "@/styles/globals.css";
import "@/styles/style.css";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (<QueryClientProvider client={queryClient}> <Component {...pageProps} />; </QueryClientProvider>
  )
}
