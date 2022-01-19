import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import './App.css';

function QuotationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);
  const [totaldsc, setTotalDsc] = useState(0);

  useEffect(() => {
    let sum = 0;
    let dscSum =0;
    const z = data.map((v, i) => {
      let amount = v.qty * v.ppu - v.dsc;
      sum += amount;
      dscSum += parseInt(v.dsc);
      return (
        <tr key={i}>
          <td>{v.qty}</td>
          <td>{v.item}</td>
          <td>{v.ppu}</td>
          <td>{v.dsc}</td>
          <td>{amount}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotal(sum);
    setTotalDsc(dscSum);
  }, [data]);




  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  return (
    <div>
      <h1>Quotation</h1>
      <Button onClick={clearTable} variant="outline-dark">
        Clear
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="table-header">Qty</th>
            <th className="table-header-item">Item</th>
            <th className="table-header">Price/Unit</th>
            <th className="table-header">Discount</th>
            <th className="table-header">Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <td>
              Total
            </td>
            <td>{total}</td>
            <td>
              Discount
            </td>
            <td>{totaldsc}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default QuotationTable;
