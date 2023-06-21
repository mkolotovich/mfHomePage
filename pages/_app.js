import '../css/style.css'
import '../css/form.css'
import '../css/micromodal.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>

      {/* <div className="container pb-0"> */}
        {/* <div className="nav"> */}
          {/* <Link className="btn" href="/">Главная</Link> */}
        {/* </div> */}
      {/* </div> */}
      <div className="container wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
