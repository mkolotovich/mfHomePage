import React, { useEffect } from 'react';
import styles from '../css/style.module.css'
import Link from 'next/link'

const Index = ({}) => {
  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('spring');
    document.querySelector('#psb').onclick = (e) => {
      e.preventDefault();
      document.querySelector('.modal').classList.add('is-open');
    };
    document.querySelector('.modal__close').onclick = (e) => {
      document.querySelector('.modal').classList.remove('is-open');
    }
    document.querySelector('.modal').onclick = (e) => {
      document.querySelector('.modal').classList.remove('is-open');
    }
    document.onkeydown = (e) => {
      if(e.keyCode === 27) {
        document.querySelector('.modal').classList.remove('is-open');
      }
    }
  },[]);
  return (
    <>
    <div className="modal micromodal-slide" id="psb-modal" aria-hidden="false">
      <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
        <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="psb-modal-title">
          <header className="modal__header">
            <h2 className="modal__title" id="psb-modal-title">Интернет-банк</h2>
            <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
          </header>
          <main className="modal__content" id="psb-modal-content">
            <ul>
              <li className={styles.list_item}>
                <a className={styles.link} href="https://ib.psbank.ru/login" target="_blank">Частным лицам</a>
              </li>
              <li className={styles.list_item}>
                <a className={styles.link} href="https://corporate.psbank.ru/" target="_blank">PSB Corporate</a>
              </li>
            </ul>
          </main>
        </div>
      </div>
    </div>

    <div className={styles.flex}>
      <a className={styles.card} target="_blank" href="https://yandex.ru" title="Яндекс">
        <img className={styles.icon_big} src="/images/yandex.png" alt="yandex"/>
      </a>

      <a className={styles.card} target="_blank" href="https://www.startpage.com"  title="Startpage">
        <img className={styles.icon_big} src="/images/startpage.png" alt="startpage"/> 
      </a>

      <a className={styles.card}
        target="_blank"
        href="https://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B7%D1%8B_%D0%9B%D1%83%D0%BD%D1%8B">
        <img id="moon-image" className={styles.icon_big} src="/images/moon/1.png" alt="moon" title="Луна"/>
      </a>
      <div className='align-start ml-auto'>
        <Link className="btn" href="/registration-staff">Регистрация</Link>
        <Link className="btn mt-10 bg-transparent" href="/login">Авторизация</Link>
      </div>
      <div className={styles.break}></div>

      <a className={styles.card} href="/phones">
        <img className={styles.icon} src="/images/phone-employee.png" alt="phone-employee"/>
        <div className={styles.info}>
          <div className={styles.header}>Телефоны сотрудников</div>
          <div className={styles.description}>Номера телефонов сотрудников министерства</div>
        </div>
      </a>

      <a className={styles.card} href="/phones-fu">
        <img className={styles.icon} src="/images/phone-goverment.png" alt="phone-goverment"/>
        <div className={styles.info}>
          <div className={styles.header}>Телефоны администраций</div>
          <div className={styles.description}>Номера телефонов администраций городов и районов</div>
        </div>
      </a>

      <a className={styles.card} href="/birthdays">
        <img className={styles.icon} src="/images/cake.png" alt="cake"/>
        <div className={styles.info}>
          <div className={styles.header}>Дни рождения</div>
          <div className={styles.description}>Список дней рождения сотрудников министерства</div>
        </div>
      </a>

      <a className={styles.card} target="_blank" href="https://budgetiq.mf.io">
        <img className={styles.icon} src="/images/budgetiq.png" alt="budgetiq"/>
        <div className={styles.info}>
          <div className={styles.header}>Budget IQ</div>
          <div className={styles.description}>Бюджетный процесс теперь происходит здесь</div>
        </div>
      </a>

      <a className={styles.card} target="_blank" href="https://budgetiq-rf.mf.io">
        <img className={styles.icon} src="/images/budgetiq-rf.png" alt="budgetiq-rf"/>
        <div className={styles.info}>
          <div className={styles.header}>Budget IQ 2023+</div>
          <div className={styles.description}>Бюджетный процесс снова происходит здесь</div>
        </div>
      </a>

      <div className={styles.break}></div>

      <a className={styles.card} id="psb" target="_blank" href="#">
        <img className={styles.icon} src="/images/psb.png" alt="psb"/>
        <div className={styles.info}>
          <div className={styles.header}>ПСБ</div>
          <div className={styles.description}>Промсвязьбанк: интернет-банк</div>
        </div>
      </a>

      <a className={styles.card} target="_blank" href="https://eb.cert.roskazna.ru/">
        <img className={styles.icon} src="/images/eb.png" alt="eb"/>
        <div className={styles.info}>
          <div className={styles.header}>Электронный бюджет</div>
          <div className={styles.description}>Не запускайте, если вы не уверены для чего вам это нужно</div>
        </div>
      </a>

      <a className={styles.card} target="_blank" href="https://ufk83.sufd.budget.gov.ru/index.zul">
        <img className={styles.icon} src="/images/sufd.png" alt="sufd"/>
        <div className={styles.info}>
          <div className={styles.header}>СУФД</div>
          <div className={styles.description}>Не запускайте, если вы не уверены для чего вам это нужно</div>
        </div>
      </a>

      <a className={styles.card} target="_blank" href="https://zakupki.gov.ru">
        <img className={styles.icon} src="/images/zakupki.png" alt="zakupki"/>
        <div className={styles.info}>
          <div className={styles.header}>ЕИС</div>
          <div className={styles.description}>Не запускайте, если вы не уверены для чего вам это нужно</div>
        </div>
      </a>

    </div>
  </>
  )
}

export default Index