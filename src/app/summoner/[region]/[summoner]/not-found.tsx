import Image from 'next/image';

export default function SummonerNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-[250px] h-[350px] flex flex-col items-center justify-center text-center backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl shadow-black/10 px-4 py-4 rounded-lg">
        <h2
          role="img"
          aria-label="Error 404"
          className="text-[64px] leading-none text-tan font-black mb-2 flex items-center justify-center gap-1"
        >
          <span aria-hidden="true">4</span>
          <Image
            src="/poro-pregunta.png"
            alt=""
            aria-hidden="true"
            width={64}
            height={64}
            className="inline-block"
          />
          <span aria-hidden="true">4</span>
        </h2>
        <p className="text-sm font-black text-shadow-custom">
          Invocador no <br />
          encontrado
        </p>
      </div>
    </div>
  );
}
