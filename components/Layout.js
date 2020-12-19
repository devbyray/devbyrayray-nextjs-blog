export default function Layout({ children }) {
  return (
    <>
      <div className="container mx-auto px-4 flex justify-center">{children}</div>
      <style jsx global>{`
        code {
          font-family: 'Menlo';
        }
      `}</style>
    </>
  )
}
