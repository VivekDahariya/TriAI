import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InputForm from "./components/InputForm";
import ComparisonView from "./components/ComparisonView";
import SharePage from "./pages/SharePage";


function Home() {

  const [responses, setResponses] = useState(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState("");


  const handleShare = async () => {

    if (!responses) return;


    try {

      const response = await fetch(
        "http://localhost:5050/api/share",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            responses
          })
        }
      );


      const data = await response.json();


      const link =
        `${window.location.origin}/share/${data.shareId}`;


      await navigator.clipboard.writeText(link);


      setToast("🔗 Share link copied");


      setTimeout(() => {
        setToast("");
      }, 2500);


    } catch (error) {

      console.error(error);

      setToast("❌ Failed to create share link");

      setTimeout(() => {
        setToast("");
      }, 2500);
    }

  };


  return (

    <div
    className="
      min-h-screen
      transition-all
      duration-500
      bg-[radial-gradient(circle_at_top,#25104d_0%,#050b1f_40%,#020617_100%)]
      text-white
    "
  >


<Navbar onShare={handleShare} />


      <main
        className="
          max-w-[1500px]
          mx-auto
          px-12
          py-10
        "
      >

        <InputForm
          setResponses={setResponses}
          loading={loading}
          setLoading={setLoading}
        />


        <ComparisonView
          responses={responses}
          loading={loading}
        />

      </main>


      <Footer />


      {toast && (

        <div
          className="
            fixed
            bottom-6
            right-6
            z-50

            px-5
            py-3

            rounded-2xl

            bg-green-600
            text-white

            shadow-2xl
            shadow-green-500/40

            font-medium

            animate-pulse
          "
        >
          {toast}
        </div>

      )}


    </div>

  );

}


export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/share/:id"
          element={<SharePage />}
        />

      </Routes>

    </BrowserRouter>

  );

}