import { useState } from "react";
import aiImage from "../assets/ai-illustration.png";

export default function InputForm({
  setResponses,
  loading,
  setLoading
}) {

  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {

    if (!prompt.trim()) return;

    setResponses(null);
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5050/api/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt
          })
        }
      );

      const data = await response.json();

      setResponses(data);

    } catch(error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };


  return (

    <section className="mb-16">


      {/* Hero */}
      <div className="text-center mb-10">


        <div
          className="
            inline-flex
            items-center
            px-5
            py-2
            rounded-full
            border
            border-purple-500/30
            bg-purple-500/10
            text-purple-300
            text-sm
            font-medium
            mb-6
          "
        >
          ✨ Compare AI Models Instantly
        </div>


        <h1
          className="
            text-8xl
            font-black
            mb-4
            bg-gradient-to-r
            from-cyan-400
            via-purple-500
            to-pink-500
            bg-clip-text
            text-transparent
          "
        >
          TriAI
        </h1>


        <p
          className="
            text-xl
            text-slate-600
            dark:text-gray-300
          "
        >
          Compare OpenAI, Gemini and Grok side-by-side
        </p>


      </div>



      {/* Main Prompt Card */}
      <div
        className="
          glass
          rounded-[32px]
          p-6

          flex
          items-center
          gap-8

          border-purple-500/30
          shadow-[0_0_60px_rgba(168,85,247,0.25)]
        "
      >


        {/* Left */}
        <div className="flex-1">


          <textarea

            rows="5"

            value={prompt}

            disabled={loading}

            onChange={(e)=>setPrompt(e.target.value)}

            placeholder="Ask anything..."


            className="
              w-full

              rounded-2xl

              px-6
              py-5

              text-lg

              resize-none

              outline-none

              border

              border-white/10


              bg-slate-200
              text-slate-900


              dark:bg-[#151C2F]
              dark:text-white


              transition-all

              focus:border-purple-500

              focus:shadow-[0_0_35px_rgba(168,85,247,0.4)]
            "

          />


          <div className="mt-5">


            <button

              onClick={handleSubmit}

              disabled={loading}


              className="
                px-10
                py-4

                rounded-2xl

                text-white
                font-bold

                bg-gradient-to-r

                from-purple-500
                via-fuchsia-500
                to-blue-500


                hover:scale-105

                transition-all

                duration-300

                shadow-lg
                shadow-purple-500/40

                disabled:opacity-50
              "

            >

              {loading
                ? "Thinking..."
                : "✨ Ask All Models"}

            </button>


          </div>


        </div>



        {/* Right AI Illustration */}
        <div
          className="
            w-[220px]
            flex
            justify-center
            opacity-80
          "
        >


          <img
            src={aiImage}
            alt="AI Illustration"
            className="
              w-[170px]
              drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]
            "
          />


        </div>


      </div>


    </section>

  );

}