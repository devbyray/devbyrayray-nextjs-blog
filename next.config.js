
const config = {
    target: "serverless",
    images: {
        domains: ['lh3.googleusercontent.com', 'avatars2.githubusercontent.com', 'res.cloudinary.com', 'localhost', 'cdn-images-1.medium.com', 'a.impactradius-go.com', 'skillshare.eqcm.net', 'cloudways.com', 'ws-na.amazon-adsystem.com', 'ir-na.amazon-adsystem.com'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/raymons/image/fetch/',
    },
    async redirects() {
        return [
            {
                source: '/type-script-s-new-top-level-await/',
                destination: '/post/2020-06-22-typescripts-new-top-level-await',
                permanent: true,
            },
            {
                source: '/how-to-build-a-serverless-webshop/',
                destination: '/post/2020-07-08-serverless-functions-webshop-faunadb-netlify-angular',
                permanent: true,
            },
            {
                source: '/how-to-build-a-serverless-webshop-part-2/',
                destination: '/post/2020-07-30-serverless-functions-webshop-faunadb-netlify-angular-part-2',
                permanent: true,
            },
            {
                source: '/native-lazy-loading-in-the-browser/',
                destination: '/post/2020-05-20-native-lazy-loading-in-the-browser-85dabe6653ed',
                permanent: true,
            },
            {
                source: '/native-lazy-loading-in-the-browser/',
                destination: '/post/2020-05-20-native-lazy-loading-in-the-browser-85dabe6653ed',
                permanent: true,
            },
            {
                source: '/dear-code-newbie-be-1-better-everyday/',
                destination: '/post/2020-05-18-dear-codenewbie-be-1-better-everyday-c7688a4166b5',
                permanent: true,
            },
            {
                source: '/thoughts-about-micro-frontends-in-2020/',
                destination: '/post/2020-01-04-thoughts-about-micro-frontends-in-2020-dd95eb7216f',
                permanent: true,
            },
            {
                source: '/thoughts-about-micro-frontends-in-2020/',
                destination: '/post/2020-01-04-thoughts-about-micro-frontends-in-2020-dd95eb7216f',
                permanent: true,
            },
            {
                source: '/4-developer-job-interview-questions-you-need-to-be-prepared-for/',
                destination: '/post/2020-05-11-4-developer-job-interview-questions-you-need-to-be-prepared-for-b10313342e75',
                permanent: true,
            },
            {
                source: '/4-steps-to-get-started-with-serverless-functions-on-netlify/',
                destination: '/post/2020-05-26-4-steps-to-get-started-with-serverless-functions-on-netlify-a6942bf071ca',
                permanent: true,
            },
            {
                source: '/5-tips-to-make-100-days-of-code-effective-for-everyone/',
                destination: '/post/2020-05-13-5-tips-to-make-100daysofcode-effective-for-everyone-3695587aad64',
                permanent: true,
            },
            {
                source: '/jump-start-your-developer-career-from-zero-to-hero/',
                destination: '/post/2020-01-04-thoughts-about-micro-frontends-in-2020-dd95eb7216f',
                permanent: true,
            },
        ]
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.mdx/,
            use: [
                options.defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                },
            ],
        })

        return config
    },
}

module.exports = config