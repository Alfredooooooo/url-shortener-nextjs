import { getUrl } from './api/url';

export async function getServerSideProps(context: any) {
    const { shortUrl } = context.params;
    console.log(shortUrl);

    const destination = await getUrl(shortUrl);
    console.log(destination);
    return {
        redirect: {
            destination: destination,
        },
    };
}

const ShortUrl = () => {
    return <div>Short Url</div>;
};

export default ShortUrl;
