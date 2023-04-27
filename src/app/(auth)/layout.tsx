import Image from 'next/image';
// import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-slate-50 w-full h-screen grid grid-cols-1 grid-rows-[64px_1fr]">
      <nav className="bg-pucci-500 h-16 w-full">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="relative w-16 h-16">
            <Image
              alt="banner"
              fill
              src="/logo1.png"
              className="object-contain bg-pucci-500 bg-blend-overlay"
            />
          </div>
          {/* <Link
            href="/signin"
            className="w-28 text-center bg-pucci-300 hover:bg-pucci-800 font-bold p-2 rounded"
          >
            Login
          </Link> */}
        </div>
      </nav>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2">
        {children}
        <div id="banner" className="bg-pucci-500 hidden lg:block relative">
          <Image
            alt="banner"
            fill
            src="/logo.png"
            className="object-contain bg-pucci-500 bg-blend-overlay"
          />
        </div>
      </div>
    </section>
  );
}
