import express from "express";
import bodyParser from "body-parser";
import { parseD1, parseD2, parseD3 } from "./answersHandler.js";
import { addPoints, createD1File } from "./D1.js";
import { createD2File } from "./D2.js";
import { sendDocument, sendMessage } from "./upload.js";
import { getUserInfo, setPoints, setTest } from "./db.js";
import { clearTimer } from "./timers.js";
import { createIELTSFile } from "./IELTS.js";
import { updateDeal } from "./crm.js";
import { customFields, statuses } from "./config.js";
import { sendEmail } from "./nodemailer.js";
import "dotenv/config";
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
					fileName: `Результаты_диагностики_${d1.senderId}.docx`,
				});
				console.log(fileName);
				await sendDocument(d1.senderId, fileName);
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
					fileName: `Результаты_диагностики_${d2.senderId}`,
				});
				await sendDocument(d2.senderId, fileName);
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
					fileName: `Результаты_диагностики_${d3.senderId}`,
				});
				await sendDocument(d3.senderId, fileName);
				console.log(d3.points);
				break;
			default:
				break;
		}
		await setTest(userId, test);

		clearTimer(userId);
		res.send("Success");
		const userInfo = await getUserInfo(userId);
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
		await sendEmail({
			to: process.env.RECIEVER_EMAIL,
			subject: `${userInfo.first_name} ${userInfo.last_name}`,
			text: "Результаты диагностики",
			attachment: `./docs/${fileName}`,
		});
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});
