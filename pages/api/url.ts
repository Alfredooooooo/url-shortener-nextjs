import { Urls } from '@/models/Urls';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../utils/connectMongo';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const urls = getUrlList();
        res.status(200).json(urls);
    } else if (req.method === 'POST') {
        await connectMongo();
        const { originalUrl, shortUrl } = req.body;
        console.log('test');
        const newUrl =
            shortUrl === ''
                ? await Urls.create({ originalUrl })
                : await Urls.create({ originalUrl, shortUrl });
        res.status(201).json(newUrl);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}

export async function getUrlList() {
    await connectMongo();
    const urls = await Urls.find();
    return urls;
}

export async function getUrl(shortUrl: string) {
    await connectMongo();
    const urlObj = await Urls.findOne({ shortUrl });
    const url = urlObj.originalUrl;
    urlObj.clicked++;
    urlObj.save();
    return url;
}
