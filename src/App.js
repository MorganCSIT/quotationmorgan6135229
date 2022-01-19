import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocalStorage } from 'react-use';
import QuotationTable from "./QuotationTable";
import './App.css';

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const dscRef = useRef();

  const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);

  const dummyProducts = [
    { id: "p001", name: "Dragon penis", price: 8000 },
    { id: "p002", name: "Unicorn corn-dog", price: 5500 },
    { id: "p003", name: "Boiled troll liver", price: 4300 },
    { id: "p004", name: "Fried Shark testicles ", price: 500 },
  ];


  const addItem = () => {

    if (parseFloat(dscRef.current.value) > parseFloat(ppuRef.current.value)) {
      alert("Discount exceeds amount: Please try again!");
      return;
    }

    if (qtyRef.current.value === "0" || qtyRef.current.value === "" || qtyRef.current.value === " ") {
      alert("Cannot log empty quantity")
      return;
    }

    

    const pid = itemRef.current.value;
    const product = dummyProducts.find(e => e.id === pid);


    if (Object.keys(dataItems).length > 0) {
      for (var key in dataItems) {
        if (product.name === dataItems[key].item) {
          dataItems[key].qty =  parseFloat(qtyRef.current.value) + parseFloat(dataItems[key].qty)
          dataItems[key].dsc = parseFloat(dscRef.current.value) + parseFloat(dataItems[key].dsc)
          setDataItems([...dataItems]);
          return;
        }
      }
    }
      
    var itemObj = {
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      dsc: dscRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
    console.log(dataItems[1].item);
    console.log(itemRef.current.value);
    console.log(dataItems);

  };

  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = dummyProducts.find((e) => e.id === pid);
    ppuRef.current.value = product.price
    
  }
  
  const options = dummyProducts.map(v => {
    return <option value={v.id}>{v.name}</option>
  })

  return (
    <Container style= {{width: "50%", margin: "30px"}}>
      <Row>
      <h1>Morgan 6135229</h1>
        <Col>
          <Row>
            <Col>
              Item
              {/* <input type="text" ref={itemRef} /> */}
              <Form.Select ref={itemRef} onChange={productChange}>{options}</Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className="app-label">Price/Unit</Form.Label>
              <Form.Control disabled={false} type="number" placeholder="Price Per Unit" ref={ppuRef}/>
            </Col>
          </Row>
          <Row>
            <Col>             
            <Form.Label className="app-label">Discount</Form.Label>
              <Form.Control type="number" ref={dscRef} defaultValue={0}/>
            </Col>
          </Row>
          <Row>
            <Col>             
            <Form.Label className="app-label">Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1}/>
            </Col>
          </Row>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
          {/* {JSON.stringify(dataItems)} */}
        </Col>
        <Col md={8}>
          <QuotationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
