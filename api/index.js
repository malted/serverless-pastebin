export default function handler(request, response) {
	const { key, value } = request.query;
	if (value) process.env[key] = value;
	response.status(200).send(`${key}:${process.env[key]}`);
}
