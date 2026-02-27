import "./globals.css";
import Navbar from "./components/Navbar";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "e-Nirikshan",
  description: "Public Project Transparency Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
