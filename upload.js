import { API, Attachment, Upload } from "vk-io";
import dotenv from "dotenv";
import fs from "fs";
import url from "url";
import util from "util";
import path from "path";
import { load } from "@pspdfkit/nodejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { builder } from "./keyboards.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const fs = promises;

const api = new API({
	token: process.env.TOKEN,
});

export const upload = new Upload({
	api,
});

export const sendMessage = async (peer_id, message, keyboard) => {
	const result = await api.messages.send({
		peer_id,
		random_id: 0,
		message,
		keyboard,
	});
};

export const sendDocument = async (userId, fileName) => {
	const attachment = await upload.messageDocument({
		source: {
			value: `./docs/${fileName}`,
			contentType: "doc",
			filename: `./docs/${fileName}`,
		},
		peer_id: userId,
	});
	const result = await api.messages.send({
		peer_id: userId,
		user_id: userId,
		random_id: 0,
		attachment,
		message: `Результаты диагностического теста готовы!
Обещанные подарки отправим вам в течение двух часов.
А пока получите обратную связь👇`,
		keyboard: builder([{ label: "Получить обратную связь" }]).oneTime(true),
	});
};
