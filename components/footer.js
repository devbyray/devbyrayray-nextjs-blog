const date = new Date()
const latestUpdate = new Intl.DateTimeFormat('en-US').format(date)

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <span>Copyright &copy; by <a href="https://twitter.com/devbyrayray" title="twitter.com/@devbyrayray" target="_blank">DevByRayRay</a> | Last updated at: {latestUpdate}</span>
        <img
          height="0"
          width="0"
          src="https://skillshare.eqcm.net/i/2339544/300218/4650"
          border="0"
        />
      </footer>
      <style jsx>{`
        .footer {
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 50px;
          background: var(--color-darkyello);
          font-size: 80%;
          text-align: center;
          line-height:50px;
        }
        .footer img {
          display: none;
          position:absolute;
          visibility:hidden;
        }
        .footer a {
          color: #000000;
        }
      `}</style>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-166352508-1"></script>
      <script dangerouslySetInnerHTML={
        {
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-166352508-1');

    `}
      }>
      </script>
    </>
  )
}