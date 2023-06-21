import { useState } from 'react'
import dbConnect from '../lib/dbConnect'
// import Index from './index'
import Link from 'next/link'
const { User } = require('../models/Email.cjs');
const { Phone } = require('../models/Phone.cjs');
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'

const AdministrationPage = ({ administration, users }) => {
  const [accessEnable, setAccessEnable] = useState('');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState('false');
  const [loading, setLoading] = useState('false');
  let result;
  const router = useRouter();
  const handleSubmit = (e, login, pass) => {
    e.preventDefault(); 
    const user = users.find((el) => el.login === login);
      if (user && user.pass === pass) {
        setAccessEnable(true);
        localStorage.setItem('user', login);
      }
      else {
        if (error === 'denied') {
          result = <p>Регистрация по указанному email запрещена!</p>;
        } else {
          setAccessEnable(false);
        }
      }
  }
  const administrations = [administration]
  const registered = true;
  // const props = { administrations, registered };
  if (accessEnable === true) {
    // result = <Index {...props} />
    cookieCutter.set('registered', 'true');
    router.push('/phones-fu');
  } else if (accessEnable === false) {
    result = <h1 className='table-wrapper'>Аутентификация не произведена: неверный логин и/или пароль</h1>
  }
  return (
    <> 
    <div className='align-start'>
      <div className="container pl-0 pb-0 pt-0">
        <Link className="btn nav bg-transparent" href="/">Главная</Link>
      </div>
      <form className='input bg-transparent' onSubmit={(e) => handleSubmit(e, login, pass)} id='foo'>
        <label htmlFor="email">Введите Ваш логин</label>
        <input id="email" placeholder="логин" name="name" value={login} onChange={(e)=>setLogin(e.target.value)} required></input>
        <label htmlFor="password">Введите Ваш пароль</label>
        <input id="password" placeholder="пароль" name="name" value={pass} onChange={(e)=>setPass(e.target.value)} required></input>
        <button className='btn bg-transparent' id="demo">Авторизироваться</button>
      </form>
      {submitted !== 'false' && 
        <div className='table-wrapper'>
          {result}
        </div>
      }
      {loading === true && <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
    </div>
    {result} 
    </>
  )
}

export async function getServerSideProps({ }) {
  await dbConnect()

  const result = await Phone.find({})
  const usersInDb = await User.find({})
  const users = usersInDb.map((doc) => {
    const user = doc.toObject();
    user._id = user._id.toString();
    return user;
  })
  const administrations = result.map((doc) => {
    const administration = doc.toObject();
    administration._id = administration._id.toString();
    return administration;
  })

  return { props: { administrations, users } }
}

export default AdministrationPage
