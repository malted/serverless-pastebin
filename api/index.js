export default function handler(request, response) {
	const { key, value } = request.query;
	process.env[key] = value;
	response.status(200).send(`${key}:${process.env[key]}`);
}
