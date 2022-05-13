import './App.css';
import Navigation from './Navigation/Navigation';
import AppRoutes from '../routes/AppRoutes';
import UserMessage from './UserMessage/UserMessage';



const App = () => {
  return (
    <>
      <Navigation />
      <AppRoutes />
      <UserMessage />
      {/* <Footer /> */}
    </>
  );
}

export default App