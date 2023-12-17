/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { useState } from "react";
 

const Deneme =()=>{
   const [number,setNumber]=useState(0);
   console.log("numberOf",number);
  const [deneme,setDeneme]=useState(0);
   const change=()=>{
    setDeneme(deneme+1);
   console.log("denemDeğer",deneme);
   };
    
   return( <>
          <p>{number}</p>
           <button onClick={change}></button>
        </>
   );
};
export default Deneme;