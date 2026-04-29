export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0a0a0f] text-white antialiased min-h-screen">
      {children}
    </div>
  );
}
