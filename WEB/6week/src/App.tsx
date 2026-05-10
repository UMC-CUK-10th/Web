import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserDataDisplay from './components/UserDataDisplay'; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <UserDataDisplay /> 
      </div>
    </QueryClientProvider>
  );
}

export default App;