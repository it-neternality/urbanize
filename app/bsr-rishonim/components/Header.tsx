import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="p-4 md:p-6 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/bsr-rishonim/urbanize-office-logo.png"
                        alt="Urbanize לוגו"
                        width={150}
                        height={50}
                        priority
                        className="h-auto"
                    />
                </Link>
            </div>
        </header>
    );
}
