"use client";

import { useState } from "react";

export default function TestImage(){

const [result,setResult]=useState(null);


async function upload(e){

const file=e.target.files[0];

const formData=new FormData();

formData.append("image",file);

const res=await fetch("/api/test-image-engine",{

method:"POST",

body:formData

});

const data=await res.json();

setResult(data);

}


return(

<div style={{padding:40}}>

<h2>Test Gemini Image Analysis</h2>

<input type="file" onChange={upload}/>

<pre>

{JSON.stringify(result,null,2)}

</pre>

</div>

);

}
