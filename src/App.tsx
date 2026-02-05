import type { ReactElement } from 'react';
import './App.css'
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Main from './components/layout/Main';

function App(): ReactElement {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
