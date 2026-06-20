export default function Footer() {
  return (
    <footer
      className="
        mt-24
        border-t
        border-white/10
        backdrop-blur-xl
      "
    >
      <div
        className="
          max-w-[1500px]
          mx-auto
          px-12
          py-8
          flex
          flex-col
          items-center
          gap-5
        "
      >

        <h3
          className="
            text-lg
            font-semibold
            text-slate-700
            dark:text-white
          "
        >
          Built with ❤️ by{" "}
          <span
            className="
              bg-gradient-to-r
              from-cyan-400
              via-purple-500
              to-pink-500
              bg-clip-text
              text-transparent
              font-bold
            "
          >
            Vivek Dahariya
          </span>
        </h3>


        <div
          className="
            flex
            gap-4
            flex-wrap
            justify-center
          "
        >

          <div
            className="
              px-5
              py-2
              rounded-full
              bg-yellow-500/15
              text-yellow-400
              border
              border-yellow-500/30
              text-sm
              font-medium
            "
          >
            🔥 Powered by Gemini API
          </div>


          <div
            className="
              px-5
              py-2
              rounded-full
              bg-blue-500/15
              text-blue-400
              border
              border-blue-500/30
              text-sm
              font-medium
            "
          >
            ⚡ Parallel Responses
          </div>


          <div
            className="
              px-5
              py-2
              rounded-full
              bg-green-500/15
              text-green-400
              border
              border-green-500/30
              text-sm
              font-medium
            "
          >
            🔗 Shareable Links
          </div>

        </div>

      </div>
    </footer>
  );
}