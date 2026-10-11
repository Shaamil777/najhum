import Footer from "@/components/layout/Footer";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
