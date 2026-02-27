import Image from "next/image";

export default function Home() {
  return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <Image src="/bruh.webp" alt="bruh" width={945} height={248}/>
      </main>
  );
}
