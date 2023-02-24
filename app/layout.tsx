import MainLayout from '@/components/layouts/Main'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
