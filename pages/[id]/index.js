import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dbConnect from '../../lib/dbConnect'
import Index from '../index'
const { User } = require('../../models/Email.cjs');
const { Phone } = require('../../models/Phone.cjs');

const AdministrationPage = ({ administration, user }) => {
  const [accessEnable, setAccessEnable] = useState('');
  useEffect(() => {
    fetch('/api/edit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    }).then((responce) => {
      return responce.json();
    }).then((data) => {
      if (data.data.expired === false) {
        if (data.data.visited === false) {
          localStorage.setItem('user', data.data.token);
        }
        fetch('/api/visited', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
        });
      }
      if (localStorage.getItem("user") === data.data.token) { 
        setAccessEnable(true);
      } else {
        setAccessEnable(false);
      }
    })
  });
  const administrations = [administration]
  const registered = true;
  const props = { administrations, registered };
  let result;
  if (accessEnable === true) {
    result = <Index {...props} />
  } else if (accessEnable === false) {
    result = <h1 className='table-wrapper'>Аутентификация не произведена: неверный или просроченный токен</h1>
  }
  return (
    <> {result} </>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const regexp = new RegExp(params.id);
  const user = await User.findOne({token: regexp}).lean();
  const administration = await Phone.findById(user.id).lean();
  administration._id = administration._id.toString();
  user._id = user._id.toString();

  return { props: { administration, user } }
}

export default AdministrationPage
