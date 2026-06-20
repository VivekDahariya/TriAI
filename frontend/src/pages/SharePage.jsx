import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ComparisonView from "../components/ComparisonView";

export default function SharePage() {
  const { id } = useParams();

  const [responses, setResponses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComparison = async () => {
      try {
        const response = await fetch(
          `http://localhost:5050/api/share/${id}`
        );

        const data = await response.json();

        setResponses(data);

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };

    loadComparison();

  }, [id]);


  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[radial-gradient(circle_at_top,#25104d_0%,#050b1f_40%,#020617_100%)]
          text-white
        "
      >
        Loading comparison...
      </div>
    );
  }


  return (
    <div
      className="
        min-h-screen
        bg-[radial-gradient(circle_at_top,#25104d_0%,#050b1f_40%,#020617_100%)]
        text-white
      "
    >

      <div
        className="
          max-w-[1500px]
          mx-auto
          px-12
          py-10
        "
      >

        <Link
          to="/"
          className="
            text-cyan-400
            hover:text-cyan-300
            transition
          "
        >
          ← Back to TriAI
        </Link>


        <h1
          className="
            text-5xl
            font-black
            mt-6
            mb-10
            bg-gradient-to-r
            from-cyan-400
            via-purple-500
            to-pink-500
            bg-clip-text
            text-transparent
          "
        >
          Shared TriAI Comparison
        </h1>


        <ComparisonView
          responses={responses}
          loading={false}
        />

      </div>

    </div>
  );
}