export default function Layout({ children }) {
  return (
    <>
      <div className="">{children}</div>
      <style jsx global>{`
        code {
          font-family: 'Menlo';
        }
      `}</style>
    </>
  )
}
