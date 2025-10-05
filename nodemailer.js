import nodemailer from "nodemailer";
import "dotenv/config";
const user = process.env.LOGIN || "tatiana.shustilova@yandex.ru";
const pass = process.env.PASS;
const transporter = nodemailer.createTransport({
	service: "yandex",
	host: "smtp.yandex.ru",
	port: 587,
	auth: {
		user,
		pass,
	},
});

// const info = await transporter.sendMail({
// 	from: `WonderLang <${user}>`,
// 	to: "lobovdima27@gmail.com",
// 	subject: "Здарова Петруха",
// 	text: "Отправляю тебе письмо программно через консоль",
// 	attachments: [{ path: "./docs/Результаты_диагностики_569772216.docx" }],
// });
// console.log("Сообщение отправлено " + info.accepted[0]);

export const sendEmail = async ({ to, subject, text, attachment }) => {
	try {
		const info = await transporter.sendMail({
			from: `NativeLike <${user}>`,
			to,
			subject,
			text,
			attachments: attachment ? [{ path: attachment }] : null,
		});
		console.log("Сообщение отправлено " + info.accepted[0]);
	} catch (error) {
		console.log(error);
	}
};
