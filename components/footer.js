const date = new Date()
const latestUpdate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)

export default function Footer() {
  return (
    <>
      <footer className="footer flex flex-col justify-center">
        <div className="text-center w-full">
          <span>Copyright &copy; by <a href="https://twitter.com/devbyrayray" title="twitter.com/@devbyrayray" target="_blank">DevByRayRay</a> | Last updated at: {latestUpdate}</span>
          <img
            height="0"
            width="0"
            src="https://skillshare.eqcm.net/i/2339544/300218/4650"
            border="0"
          />
        </div>
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
    </>
  )
}