"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import L from "leaflet";


// Fix marker icon issue in Next.js

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});



export default function KeralaMap() {

  const [projects, setProjects] = useState([]);


  useEffect(() => {

    fetchProjects();

  }, []);



  async function fetchProjects() {

    const { data, error } = await supabase
      .from("projects")
      .select("*");

    if (!error) setProjects(data);

  }



  return (

    <div style={{ position: "relative" }}>


      {/* LEGEND BOX */}


      <div
        style={{

          position: "absolute",

          top: 20,

          right: 20,

          zIndex: 1000,

          backgroundColor: "rgba(30, 41, 59, 0.85)",

          color: "white",

          padding: "12px 18px",

          borderRadius: "10px",

          border: "2px solid white",

          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",

          fontSize: "14px",

          lineHeight: "1.8",

        }}
      >

        <b>Project Status</b>

        <div>🟢 Completed</div>

        <div>🟡 Ongoing</div>

        <div>🔴 Delayed</div>

      </div>



      {/* MAP */}



      <MapContainer

        center={[10.8505, 76.2711]}

        zoom={7}

        style={{

          height: "90vh",

          width: "100%",

          borderRadius: "12px",

        }}

      >


        <TileLayer

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        />



        {/* MARKERS */}


        {projects.map((project) => (

          <Marker

            key={project.id}

            position={[project.latitude, project.longitude]}

          >

            <Popup>

              <div style={{ width: "200px" }}>

                <h3 style={{ margin: "0 0 5px 0" }}>

                  {project.project_name}

                </h3>

                <p>

                  Start Date: {project.startdate}

                </p>

                <p>

                  Status:

                  <b> {project.status}</b>

                </p>


                <Link

                  href={`/projects/${project.id}`}

                  style={{

                    color: "#2563eb",

                    fontWeight: "bold",

                    textDecoration: "underline",

                  }}

                >

                  More Info →

                </Link>

              </div>

            </Popup>

          </Marker>

        ))}


      </MapContainer>


    </div>

  );

}
