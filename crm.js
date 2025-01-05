import axios from "axios";
import "dotenv/config";
const token = process.env.AMO_CRM_API_KEY;
export const amoCRM = axios.create({
	baseURL: "https://midmorning.amocrm.ru/api/v4/",
	timeout: 1000,
	headers: { Authorization: `Bearer ${token}` },
});

export const updateDeal = async (id, status_id, custom_fields_values) => {
	try {
		const res = await amoCRM.patch("leads/" + id, {
			id,
			status_id,
			custom_fields_values,
		});
	} catch (error) {
		console.log(error.response?.data["validation-errors"][0].errors);
	}
	// console.log(res.data["validation-errors"][0].errors);
	// console.log(res.data);
};
// const res = await amoCRM.get("leads/pipelines/8999258");
// console.log(res.data._embedded.statuses);

// const res = await amoCRM.get("leads/custom_fields");
// console.log(res.data._embedded.custom_fields);

// try {
// 	const res = await amoCRM.post("leads", [
// 		{ name: "test", price: 1000, pipeline_id: 8999258 },
// 	]);
// 	const leadId = res.data._embedded.leads[0].id;
// 	console.log(leadId);
// } catch (error) {
// 	console.log(error.response.data["validation-errors"][0].errors);
// }

// {
// 	"field_id": 3,
// 	"values": [
// 			{
// 					"value": "Значение поля"
// 			}
// 	]
// },
