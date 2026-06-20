import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";

import openaiLogo from "../assets/openai.svg";
import geminiLogo from "../assets/gemini.svg";
import grokLogo from "../assets/grok.svg";


export default function Column({
  title,
  data,
  loading
}) {

  const [copied, setCopied] = useState(false);


  const copyResponse = async () => {

    if (!data?.text) return;

    await navigator.clipboard.writeText(
      data.text
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);

  };


  const providers = {

    OpenAI: {
      logo: openaiLogo,
      border: "border-orange-400/40"
    },

    Gemini: {
      logo: geminiLogo,
      border: "border-cyan-400/40"
    },

    Grok: {
      logo: grokLogo,
      border: "border-purple-400/40"
    }

  };


  const provider = providers[title];


  const statusClass =
    data?.status === "live"
      ? "bg-green-500/20 text-green-500 border-green-500/40"
      : data?.status === "error"
      ? "bg-red-500/20 text-red-500 border-red-500/40"
      : "bg-yellow-500/20 text-yellow-500 border-yellow-500/40";


  const statusText =
    data?.status === "live"
      ? "LIVE"
      : data?.status === "error"
      ? "ERROR"
      : "MOCK";


  return (

    <div
      className={`
        glass
        ${provider.border}

        min-h-[650px]

        rounded-[32px]

        overflow-hidden

        flex
        flex-col

        transition-all
        duration-300

        hover:-translate-y-2
        hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]
      `}
    >


      {/* Header */}

      <div
        className="
          px-6
          py-5

          flex
          justify-between
          items-center

          border-b
          border-white/10
        "
      >


        <div className="flex items-center gap-4">


          <div
            className="
              w-14
              h-14

              rounded-2xl

              bg-white/10

              flex
              items-center
              justify-center
            "
          >

            <img
              src={provider.logo}
              alt={title}
              className="
                w-8
                h-8
                object-contain
              "
            />

          </div>


          <div>


            <h2
              className="
                text-3xl
                font-black

                text-slate-900
                dark:text-white
              "
            >
              {title}
            </h2>


            {data && (

              <div className="flex items-center gap-3 mt-2">


                <span
                  className={`
                    px-3
                    py-1

                    rounded-full

                    border

                    text-xs
                    font-bold

                    animate-pulse

                    ${statusClass}
                  `}
                >
                  {statusText}
                </span>


                <span
                  className="
                    text-sm

                    text-slate-600
                    dark:text-gray-400
                  "
                >
                  ⚡ {data?.latency ?? "--"}s
                </span>


              </div>

            )}


          </div>


        </div>



        <button

          onClick={copyResponse}

          className="
            w-11
            h-11

            rounded-xl

            bg-white/10

            border
            border-white/10

            flex
            items-center
            justify-center

            hover:scale-110

            transition
          "
        >

          {
            copied
            ? (
              <Check
                size={18}
                className="text-green-500"
              />
            )
            : (
              <Copy
                size={18}
                className="
                  text-slate-700
                  dark:text-gray-300
                "
              />
            )
          }


        </button>


      </div>


      {/* Response Content */}

      <div
        className="
          flex-1

          p-6

          overflow-auto
        "
      >


        {

        loading ? (

          <div className="animate-pulse space-y-4">

            <div className="h-4 bg-gray-400/30 rounded"></div>

            <div className="h-4 bg-gray-400/30 rounded"></div>

            <div className="h-4 bg-gray-400/30 rounded"></div>

            <div className="h-4 bg-gray-400/30 rounded w-2/3"></div>

          </div>


        ) : data?.text ? (


          <div
  className="
    markdown-content
    text-white
    leading-8
  "
>

            <ReactMarkdown>
              {data.text}
            </ReactMarkdown>

          </div>


        ) : (


          <div
            className="
              text-slate-500
              dark:text-gray-400
              text-lg
            "
          >
            Waiting for the prompt...
          </div>

        )

        }


      </div>


    </div>

  );

}