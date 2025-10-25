import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'CREZCO - Plataforma de Crowdfunding',
  description: 'Apoya proyectos de emprendedores y haz crecer ideas innovadoras',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body className="min-h-screen bg-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
