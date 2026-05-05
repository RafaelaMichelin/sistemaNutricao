import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl mb-6">Sistema de Nutrição</h1>
        <div className="space-y-4">
          <Link href="/login" className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Login
          </Link>
          <Link href="/cadastro" className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}
