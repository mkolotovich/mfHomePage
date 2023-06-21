import nodemailer from "nodemailer";
import dbConnect from '../../lib/dbConnect'

export default async(req, res) => {
  await dbConnect();
  const {login, token} = req.body;
  const link = new URL(token, 'http://10.12.100.192:3001');
  link.search = `login=${login}`;
  const USER = process.env.USER;
  const PASS = process.env.PASS;
  let transporter = nodemailer.createTransport({
    host: 'minfinlnr.su',
    port: 465,
    secure: true,
    auth: {
      user: USER,
      pass: PASS,
    },
  })
  let result
  try {
    result = await transporter.sendMail({
      from: '"Минфин ЛНР" <test@minfinlnr.su>',
      // to: req.body.login,
      // to: 'kmslifter@yandex.ru',
      to: 'lobodin@minfinlnr.su',
      subject: 'Сообщение от Минфина ЛНР',
      text: 'This message was sent from Node js server.',
      html:
        `Это <i>сообщение</i> было отправлено от <strong>Минфина ЛНР</strong>. Вы успешно зарегистрированы на сайте телефонной книги Минфина ЛНР. Для входа на сайт телефонной книги Минфина ЛНР используйте следующую ссылку - <a href="${link.href}">Войти</a>.`,
    })
    console.log(result)
  } catch(err) {
    console.log(err);
  }
  console.log(req.body)
  
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end();
};