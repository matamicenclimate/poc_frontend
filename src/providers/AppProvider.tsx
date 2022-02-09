import * as React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { AuthProvider } from '@/context/auth-context'

const queryClient = new QueryClient()
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    )
}
