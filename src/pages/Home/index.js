import React from 'react';
import Header from "../../components/Header";
import ConnectionTable from "../../components/ConnectionTable";
import Footer from "../../components/Footer";

import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <div className="container">
          <ConnectionTable />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;