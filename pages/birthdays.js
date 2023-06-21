import React, { useEffect } from 'react';

const Birthdays = ({}) => {
  useEffect(() => {
    document.querySelector('body').classList.add('m-0');
    const body = document.querySelector('body');
    body.classList.add('spring');
  },[])
  useEffect(() => {
    const pandocFrame = document.getElementById('pandoc-frame');

    document.getElementById('search').oninput = (e) => {
      pandocFrame.contentWindow.document.body.querySelectorAll('tbody .even, tbody .odd').forEach((el) => {
        const rowText = el.innerText.replace(/\s+/g, ' ').toLowerCase();
        const inputText = e.target.value.toLowerCase();
    
        if (inputText === '' || rowText.includes(inputText)) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
    };
  })
  return (
    <>
      <div className="block flex-row">
        <a href="/" className="button">⬅️ Назад</a>
        <div className="input">
          <input type="text" id="search" placeholder="Поиск"/>
        </div>
      </div>
      <div className="iframe-border">
        <iframe id="pandoc-frame" src="/embed/birthdays.html" title="Телефоны"></iframe>
      </div>
    </>
  )
}
export default Birthdays