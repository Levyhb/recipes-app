import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Recipes() {
  return (
    <div>
      <Header title="Meals" profileIcon searchIcon />
      <Footer />
    </div>
  );
}