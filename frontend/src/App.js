import React from 'react';
import {Container} from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
// import TrainersScreen from './screens/TrainersScreen'


const App = () => {
  return (
    <>
    <Header/>
    <main className="py-3"> 
      <Container>
      <HomeScreen/>
      {/* <TrainersScreen/> */}
      </Container>
     </main>
     <Footer/>
    </>
  );
}

export default App;
