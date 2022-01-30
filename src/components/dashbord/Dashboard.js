import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';


function PrintingClass() {

  const [result, setResult] = useState("")

  const calculer = (e) => {
    setResult(result.concat(e.target.name))
  }

  const clear = () => {
    setResult("");
  }

  const backspace = () => {
    setResult(result.slice(0, result.length - 1))
  }

  return (
    <div>
      <input type="text" value={result} />
      <div>
        <button id="clear" onClick={clear}>clear</button>
        <button id="backspace" onClick={backspace}>C</button>
        <button name="1" onClick={calculer}>1</button>
        <button name="2" onClick={calculer}>2</button>
        <button name="3" onClick={calculer}>3</button>
        <button name="4" onClick={calculer}>4</button>
        <button name="5" onClick={calculer}>5</button>
        <button name="6" onClick={calculer}>6</button>
        <button name="7" onClick={calculer}>7</button>
        <button name="8" onClick={calculer}>8</button>
        <button name="9" onClick={calculer}>9</button>
        <button name="+" onClick={calculer}>+</button>
        <button name="-" onClick={calculer}>-</button>
        <button name="/" onClick={calculer}>/</button>
        <button name="*" onClick={calculer}>*</button>
      </div>
    </div>
  )
}

export default PrintingClass;