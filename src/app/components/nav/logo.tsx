import Image from "next/image";

export default function Logo() {
    return (
        <a href="/" className="inline-flex">
            <Image
              className="max-w-24 h-auto"
              src="/images/logo.png"
              alt="FPV-Freq logo"
              width={180}
              height={38}
              priority
            />
            <div className="ml-4 flex items-center md:block">
                <h1 className="font-bold text-2xl">FPV Freq</h1>
                <h3 className="font-normal text-sm hidden md:block">Калькулятор конфліктів частот для FPV</h3>
            </div>
        </a>
    )
}
