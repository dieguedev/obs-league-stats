export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-[250px] h-[350px] flex flex-col items-center justify-center text-center backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl shadow-black/10 px-4 py-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-shadow-custom">
          Parámetros requeridos
        </h2>
        <p className="text-sm text-shadow-custom">
          Usa /summoner/&lt;region&gt;/&lt;usuario&gt;-&lt;tagLine&gt;
        </p>
        <p className="text-xs text-shadow-custom mt-2">
          Ejemplo: /summoner/euw/Hide on bush-KR1
        </p>
      </div>
    </div>
  );
}
