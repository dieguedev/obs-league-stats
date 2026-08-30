import Image from 'next/image';

export default function SummonerNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h2
          role="img"
          aria-label="Error 404"
          className="text-[72px] leading-none text-tan font-black mb-2 flex items-center justify-center gap-1"
        >
          <span aria-hidden="true">4</span>
          <Image
            src="/poro-pregunta.png"
            alt=""
            aria-hidden="true"
            width={72}
            height={72}
            className="inline-block"
          />
          <span aria-hidden="true">4</span>
        </h2>
        <p className="text-md font-black text-shadow-custom">
          Invocador no <br />
          encontrado
        </p>
      </div>
    </div>
  );
}
