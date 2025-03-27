export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-5 text-gray-300">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-17">
        Terms of Service
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4 leading-relaxed">
          By using <span className="text-blue-400 font-semibold">Textify</span>,
          you agree to these terms. Please read them carefully.
        </p>

        <p className="text-lg mb-4 leading-relaxed">
          By accessing and using Textify, you agree to comply with our terms.
        </p>

        <p className="text-lg mb-4 leading-relaxed">
          You may not use Textify for illegal or harmful activities.
        </p>

        <p className="text-lg leading-relaxed">
          We may update these terms from time to time. Continued use means
          acceptance.
        </p>
      </div>
    </div>
  );
}
