import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex justify-center">
      <div className="my-auto flex justify-center">
        <h1 className="text-2xl border-r pr-4 mr-4 flex items-center">404</h1>
        <div className="text-lg">
          <h2 className="text-center">Сторінку не знайдено</h2>
          <Link href="/" className="hover:text-sky-600 dark:hover:text-blue-400 text-sky-700 dark:text-blue-300">На головну</Link>
        </div>
      </div>
    </div>
  )
}
