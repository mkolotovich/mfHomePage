import React, { useEffect } from 'react';

const Phones = ({}) => {
  useEffect(() => {
    document.querySelector('body').classList.add('m-0');
    const body = document.querySelector('body');
    body.classList.add('spring');
  },[])
  return (
    <>
      <div className="block flex-row">
        <a href="/" className="button">⬅️ Назад</a>
      </div>
      <div className="iframe-border">
        <iframe id="pandoc-frame" src="http://share.mf.io/embed/phones.html" title="Телефоны"></iframe>
      </div>
    </>
  )
}
export default Phones