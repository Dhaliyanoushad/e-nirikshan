"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function ContractorPage() {

const [projects, setProjects] = useState([]);

const [form, setForm] = useState({

project_name:"",
location:"",
start_date:"",
end_date:"",
project_summary:""

});

const [pdfFile, setPdfFile] = useState(null);



useEffect(()=>{

fetchProjects();

},[]);



async function fetchProjects(){

const {data,error} = await supabase

.from("contractor_projects")

.select("*")

.order("project_id");

if(error) console.error(error);

else setProjects(data);

}



function handleChange(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}



function handlePdfChange(e){

setPdfFile(e.target.files[0]);

}



//
// CREATE PROJECT
//

async function createProject(e){

e.preventDefault();

try{

let storagePath=null;



//
// 1 Upload PDF to storage
//

if(pdfFile){

const fileName = `${Date.now()}_${pdfFile.name}`;

const {error:uploadError} = await supabase.storage

.from("project-reports")

.upload(fileName,pdfFile);

if(uploadError){

alert(uploadError.message);

return;

}

storagePath=fileName;

}



//
// 2 Insert project
//

const {data, error} = await supabase

.from("contractor_projects")

.insert({

project_name:form.project_name,

location:form.location,

start_date:form.start_date,

end_date:form.end_date,

project_summary:form.project_summary,

contractor_report_pdf:storagePath

})

.select()

.single();


if(error){

alert("Insert failed");

return;

}



//
// 3 Send PDF to AI engine
//

if(pdfFile){

const formData = new FormData();

formData.append("project_id",data.project_id);

formData.append("pdf",pdfFile);

formData.append("start_date",form.start_date);

formData.append("end_date",form.end_date);

formData.append("budget","unknown");

await fetch("/api/create-project",{

method:"POST",

body:formData

});

}



alert("Project created with AI timeline");



setForm({

project_name:"",

location:"",

start_date:"",

end_date:"",

project_summary:""

});


setPdfFile(null);

fetchProjects();

}
catch(err){

console.error(err);

alert("Unexpected error");

}

}



//
// PHOTO UPLOAD
//

async function uploadPhoto(e, projectId, location) {

try {

const file = e.target.files[0];

if (!file) {

alert("No file selected");

return;

}


const fileName = `${Date.now()}_${file.name}`;


//
// Upload to Supabase storage
//

const { error: uploadError } = await supabase.storage

.from("project-photos")

.upload(fileName, file);


if (uploadError) {

console.error(uploadError);

alert("Storage upload failed");

return;

}



//
// Save reference in DB
//

const { error: dbError } = await supabase

.from("contractor_projects")

.update({

latest_photo: {

storage_path: fileName,

date: new Date()

}

})

.eq("project_id", projectId);


if (dbError) {

console.error(dbError);

alert("Database update failed");

return;

}



//
// Send actual image to AI engine
//

const formData = new FormData();

formData.append("project_id", projectId);

formData.append("image", file);

formData.append("location", location);


const response = await fetch("/api/update-project", {

method: "POST",

body: formData

});


const result = await response.json();


if (!result.success) {

alert("AI analysis failed");

return;

}


alert("Photo uploaded & analyzed successfully");


fetchProjects();

}

catch (error) {

console.error("Upload error:", error);

alert("Unexpected error occurred");

}

}



return(

<div className="p-10 bg-gray-100 min-h-screen">


<h1 className="text-3xl font-bold mb-10">

Contractor Dashboard

</h1>



{/* CREATE PROJECT */}


<div className="bg-white p-6 rounded shadow mb-10">


<h2 className="text-xl font-semibold mb-4">

New Project

</h2>



<form onSubmit={createProject} className="space-y-4">


<input

name="project_name"

placeholder="Project Name"

className="border p-3 w-full"

onChange={handleChange}

required

/>


<input

name="location"

placeholder="Location"

className="border p-3 w-full"

onChange={handleChange}

required

/>


<input

type="date"

name="start_date"

className="border p-3 w-full"

onChange={handleChange}

required

/>


<input

type="date"

name="end_date"

className="border p-3 w-full"

onChange={handleChange}

required

/>


<textarea

name="project_summary"

placeholder="Summary"

className="border p-3 w-full"

onChange={handleChange}

/>


<input

type="file"

accept="application/pdf"

onChange={handlePdfChange}

/>


<button className="bg-blue-600 text-white px-6 py-3 rounded">

Create Project

</button>


</form>


</div>



{/* EXISTING PROJECTS */}


<div className="bg-white p-6 rounded shadow">


<h2 className="text-xl font-semibold mb-4">

Existing Projects

</h2>



{projects.map(project=>(

<div key={project.project_id}

className="border p-4 mb-4 rounded">


<h3 className="font-bold">

{project.project_name}

</h3>


<p>

{project.location}

</p>


{project.contractor_report_pdf &&(

<p className="text-gray-500">

PDF stored in system

</p>

)}



<input

type="file"

accept="image/*"

onChange={(e)=>

uploadPhoto(

e,

project.project_id,

project.location

)

}

/>



{project.latest_photo?.url &&(

<a

href={project.latest_photo.url}

target="_blank"

className="text-green-600 block"

>

View Latest Photo

</a>

)}


</div>

))}


</div>


</div>

);

}
