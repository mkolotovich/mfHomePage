import React, { useState } from 'react';
import dbConnect from '../lib/dbConnect'
import Link from 'next/link'
const { User } = require('../models/Email.cjs');
import useSpinner from 'use-spinner';
import 'use-spinner/assets/use-spinner.css';

const Registration = ({ users }) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState('false');
  const [loading, setLoading] = useState('false');
  let result;
  if (submitted === 'true') {
    result = <p>Вы успешно зарегистрированы!</p>;
  } else if (submitted === 'false') {
    result = <></>
  }
  else {
    if (error === 'denied') {
      result = <p>Регистрация по указанному email запрещена!</p>;
    } else {
      result = <p>Данный email уже зарегистрирован!</p>;
    }
  }
  const handleSubmit = async(e, login) => {
    e.preventDefault(); 
    const values = {login, pass};
      const user = users.filter((el) => el.login === login);
      if (user.length === 0) {
        setLoading(true);
        const mySlowCall = async () => {
          const res = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
          }).then((responce) => {
            return responce.json();
          });
          if (res.success !== false) {
            values.token = res.data.token;
              console.log('Response succeeded!');
              setSubmitted('true');
              setLogin('');
              setPass('');
          } else {
            setError('exist');
            setSubmitted('error');
          }
        }
        const spinned = useSpinner(mySlowCall);
        await spinned();
        setLoading(false);
      } else {
        setSubmitted('error');
        // setError('denied');
      }
  };
  return(
    <div className='align-start'>
      <Link className="btn" href="/">Главная</Link>
      <form className='input bg-transparent' onSubmit={(e) => handleSubmit(e, login)} id='foo'>
        <label htmlFor="email">Введите Ваш логин</label>
        <input id="email" placeholder="логин" name="name" value={login} onChange={(e)=>setLogin(e.target.value)} required></input>
        <label htmlFor="password">Введите Ваш пароль</label>
        <input id="password" placeholder="пароль" name="name" value={pass} onChange={(e)=>setPass(e.target.value)} required></input>
        <button className='btn' id="demo">Зарегистрироваться</button>
      </form>
      {submitted !== 'false' && 
        <div className='table-wrapper'>
          {result}
        </div>
      }
      {loading === true && <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
    </div>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const result = await User.find({})
  const pets = result.map((doc) => {
    const pet = doc.toObject()
    pet._id = pet._id.toString();
    return pet
  })

  return { props: { users: pets } }
}

export default Registration