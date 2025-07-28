export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src="/logo-packlife.svg" alt="PackLife" className="h-8" />
        <h1 className="text-xl font-semibold text-gray-800">Sistema de Entregas</h1>
      </div>
      <nav>
        {/* aquí irían los links o el avatar del usuario */}
      </nav>
    </header>
  );
}