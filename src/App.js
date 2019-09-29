import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import db from "./components/index.js";

import 'rbx/index.css';
import {Card, Column, Notification} from 'rbx';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    // <ul>
    //   {products.map(product => <Card key={product.sku}>{product.title}</Card>)}
    // </ul>
    <Column.Group>
      {[1, 2, 3, 4].map(i => (
        <Column key={i}>          
            {products.slice(4*(i-1), 4*i).map(product => <Card key={product.sku}>{product.title}</Card>)}
        </Column>
      ))}
    </Column.Group>
  );
};

export default App;