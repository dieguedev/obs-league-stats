import Image from 'next/image';

export default function SummonerNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <Image
          src="/poro-preocupado.png"
          alt=""
          aria-hidden="true"
          width={96}
          height={96}
          className="inline-block mb-2"
        />
        <p className="text-md font-black text-shadow-custom mb-2">
          Formato incorrecto
        </p>
        <p className="text-sm text-shadow-custom">
          Asegúrate de utilizar el formato:
          <br />
          <span className="font-bold text-unranked">
            /summoner/:region/:usuario-tag
          </span>
        </p>
      </div>
    </div>
  );
}
