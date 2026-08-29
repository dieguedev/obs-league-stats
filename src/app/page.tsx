export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-xl text-gray-600 font-bold mb-4">
          Parámetros requeridos
        </h2>
        <p className="text-gray-600">
          Usa /summoner/&lt;region&gt;/&lt;usuario&gt;-&lt;tagLine&gt;
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Ejemplo: /summoner/euw/Hide on bush-KR1
        </p>
      </div>
    </div>
  );
}
