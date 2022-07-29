import * as IPFS from 'ipfs-core'

export default async function handler(request, response) {
    const ipfs = await IPFS.create();

    if (request.query.value && request.query.cid) {
        response.status(400).send(JSON.stringify({
            success: false,
            error: "The value and cid parameters are mutually exclusive"
        }));
    } else if (request.query.value) {
        // Upload the data to IPFS
        const { cid } = await ipfs.add(request.query.value);
        response.status(200).send(JSON.stringify({
            success: true,
            cid
        }));
    } else if (request.query.cid) {
        // Get the data corresponding to the CID from IPFS
        const stream = await ipfs.cat(cid)
        const decoder = new TextDecoder();
        let data = "";
        for await (const chunk of stream) {
            data += decoder.decode(chunk, { stream: true });
            console.log("chunk decoded")
        }
        response.status(200).send(JSON.stringify({
            success: true,
            data
        }));
    } else {
        response.status(400).send(JSON.stringify({
            success: false,
            error: "The value or cid parameter is required"
        }));
    }
}
