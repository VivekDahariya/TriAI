import { Share2 } from "lucide-react";

export default function Navbar({
  onShare
}) {

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        backdrop-blur-2xl
        bg-slate-900/40
        border-b
        border-white/10
      "
    >

      <div
        className="
          max-w-[1500px]
          mx-auto
          px-12
          py-4
          flex
          justify-between
          items-center
        "
      >

        {/* Logo */}
        <div>

          <h1
            className="
              text-4xl
              font-black
              tracking-tight
              bg-gradient-to-r
              from-cyan-400
              via-purple-500
              to-pink-500
              bg-clip-text
              text-transparent
            "
          >
            ✨ TriAI
          </h1>


          <p
            className="
              text-sm
              text-gray-400
              mt-1
            "
          >
            Compare • Analyze • Choose the best
          </p>

        </div>


        {/* Share Button */}
        <button
          onClick={onShare}
          className="
            flex
            items-center
            gap-3

            px-7
            py-3

            rounded-2xl

            font-semibold
            text-white

            bg-gradient-to-r
            from-emerald-500
            via-green-500
            to-emerald-600

            shadow-lg
            shadow-green-500/30

            hover:scale-105
            hover:shadow-green-400/50

            transition-all
            duration-300
          "
        >

          <Share2 size={18} />

          <span>
            Share
          </span>

        </button>


      </div>

    </nav>
  );
}