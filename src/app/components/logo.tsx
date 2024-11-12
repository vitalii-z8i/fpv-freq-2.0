import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="inline-flex">
            <Image
              className="max-w-16 md:max-w-24 object-contain"
              src="/images/logo.png"
              alt="FPV-Freq logo"
              width='180'
              height='38'
              priority
            />
            <div className="ml-4 items-center block">
                <h1 className="font-bold text-2xl">FPV Freq</h1>
                <h3 className="font-normal text-sm block">Калькулятор конфліктів частот для FPV</h3>
            </div>
        </Link>
    )
}
