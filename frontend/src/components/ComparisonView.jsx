import Column from "./Column";

export default function ComparisonView({
  responses,
  loading
}) {
  return (
    <section className="mt-12">

      <div
        className="
          grid
          grid-cols-3
          gap-8
          items-start
        "
      >

        <Column
          title="OpenAI"
          data={responses?.openai}
          loading={loading}
        />

        <Column
          title="Gemini"
          data={responses?.gemini}
          loading={loading}
        />

        <Column
          title="Grok"
          data={responses?.grok}
          loading={loading}
        />

      </div>

    </section>
  );
}