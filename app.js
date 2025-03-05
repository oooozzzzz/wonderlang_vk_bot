import express from "express";
import bodyParser from "body-parser";
import { parseD1, parseD2, parseD3 } from "./answersHandler.js";
import { addPoints, createD1File } from "./D1.js";
import { createD2File } from "./D2.js";
import { sendDocument, sendMessage } from "./upload.js";
import { getUserInfo, setEmail, setPoints, setTeacher, setTest } from "./db.js";
import { clearTimer } from "./timers.js";
import { createIELTSFile } from "./IELTS.js";
import { updateDeal } from "./crm.js";
import { customFields, statuses } from "./config.js";
import { sendEmail } from "./nodemailer.js";
import "dotenv/config";
import { builder } from "./keyboards.js";
export const app = express();
app.use(bodyParser.json());
app.post("/json", async (req, res) => {
	console.log(req.body);
});

app.post("/message", async (req, res) => {
	try {
		await sendMessage(req.body.peer_id, req.body.message);
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(400);
	}
});
app.post("/results", async (req, res) => {
	console.log("got results");
	let userId;
	let points;
	let email;
	const test = req.query.test;
	let fileName;
	let isTeacher = false;
	try {
		switch (test) {
			case "d1":
				const d1 = parseD1(req.body);
				email = d1.email;
				points = d1.points;
				userId = d1.senderId;
				await setPoints(d1.senderId, parseInt(d1.points));
				fileName = await createD1File({
					results: d1.results,
					name: d1.name,
					points: d1.points,
					fileName: `Результаты_диагностики_${email}.docx`,
				});
				console.log(fileName);

				break;
			case "d2":
				const d2 = parseD2(req.body);
				email = d2.email;
				points = d2.points;
				userId = d2.senderId;
				isTeacher = d2.isTeacher;
				await setPoints(d2.senderId, parseInt(d2.points));
				fileName = await createD2File({
					results: d2.results,
					name: d2.name,
					points: d2.points,
					fileName: `Результаты_диагностики_${email}`,
				});

				break;
			case "d2IELTS":
				const d3 = parseD3(req.body);
				email = d3.email;
				points = d3.points;
				userId = d3.senderId;
				await setPoints(d3.senderId, parseInt(d3.points));
				fileName = await createIELTSFile({
					results: d3.results,
					name: d3.name,
					points: d3.points,
					fileName: `Результаты_диагностики_${email}`,
				});
				break;
			default:
				break;
		}

		const userInfo = await getUserInfo(userId);
		if (process.env.NODE_ENV === "production") {
			await sendEmail({
				to: process.env.RECIEVER_EMAIL,
				subject: `Диагностика для ${email}`,
				text: "Результаты диагностики",
				attachment: `./docs/${fileName}`,
			});
		}
		await sendEmail({
			to: email,
			subject: `Диагностика для ${email}`,
			text: "Результаты диагностики",
			attachment: `./docs/${fileName}`,
		});
		await sendEmail({
			to: "lobovdima27@gmail.com",
			subject: `Диагностика для ${email}`,
			text: "Результаты диагностики",
			attachment: `./docs/${fileName}`,
		});
		if (!/^\d{9}$/.test(userId)) {
			res.send("Success");
			return;
		}
		await sendMessage(
			userId,
			`Результаты диагностического теста готовы!
Обещанные подарки отправим вам в течение двух часов.
А пока получите обратную связь👇`,
			builder([{ label: "Получить обратную связь" }]).oneTime(true),
		);
		await setEmail(userId, email);
		await setTest(userId, test);
		await setTeacher(userId, isTeacher);
		clearTimer(userId);

		await updateDeal(userInfo.amoId, statuses.got_feedback.id, [
			{ field_id: customFields.email.id, values: [{ value: email }] },
			{
				field_id: customFields.test[test],
				values: [{ value: points }],
			},
			{
				field_id: customFields.teacher.id,
				values: [{ value: isTeacher ? "Да" : "Нет" }],
			},
		]);
		res.send("Success");
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});
