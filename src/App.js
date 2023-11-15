import logo from './logo.svg';
import './App.css';
import { OrderProvider } from './components/OrderContext';
import ContextApp from './components/ContextApp';
import UserDetailsForm from './components/UserDetailsForm';

function App() {
  return (
    <div className="App">
     <OrderProvider>
      <ContextApp />
      <UserDetailsForm/>
    </OrderProvider>
    </div>
  );
}

export default App;
