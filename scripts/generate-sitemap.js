const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const fetch = require('node-fetch');

const baseUrl = 'https://tutorrx.co'; // Replace with your actual domain

async function fetchApi(url) {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error(`Failed to fetch data from ${url}: `, error);
        return [];
    }
}

async function generateSitemap() {
    const smStream = new SitemapStream({ hostname: baseUrl });
    const writeStream = createWriteStream('./public/sitemap.xml');
    smStream.pipe(writeStream);

    // Fetch base tests
    const tests = await fetchApi(`${baseUrl}/api/tests`);

    for (const test of tests) {
        smStream.write({ url: `/test/${test.test}`, changefreq: 'daily', priority: 0.8 });

        // Fetch sections for each test
        const sections = await fetchApi(`${baseUrl}/api/tests/${test.test}/sections`);
        for (const section of sections) {
            smStream.write({ url: `/test/${test.test}/${section.section}`, changefreq: 'daily', priority: 0.7 });

            // Fetch questions for each section
            const questions = await fetchApi(`${baseUrl}/api/tests/${test.test}/sections/${section.section}/questions`);
            for (const question of questions) {
                smStream.write({
                    url: `/test/${test.test}/${section.section}/${question.question}`,
                    changefreq: 'weekly',
                    priority: 0.6
                });
            }
        }
    }

    // End sitemap stream
    smStream.end();
    await streamToPromise(smStream);
    console.log('Sitemap generated successfully!');
}

generateSitemap();
