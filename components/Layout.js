export default function Layout({ children }) {
  return (
    <>
      <div className="container mx-auto px-4">{children}</div>
      <style jsx global>{`
        code {
          font-family: 'Menlo';
        }
      `}</style>
    </>
  )
}
