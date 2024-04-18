const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');



async function generateSitemap() {
    const smStream = new SitemapStream({ hostname: 'https://www.tutorrx.co' });
    const writeStream = createWriteStream('./public/sitemap.xml');
    smStream.pipe(writeStream);

    // Fetch the test data
    const response = await fetchApi('https://www.tutorrx.co/api/tests');
    const tests = response.tests; // Accessing the 'tests' array directly

    if (!Array.isArray(tests)) {
        console.error('Expected tests to be an array:', tests);
        return;  // Exit if tests is not an array
    }

    for (const test of tests) {
        smStream.write({ url: `/${test.test}`, changefreq: 'daily', priority: 0.8 });
        // Assume each test has sections and questions to simplify this example
        // This assumes your API would correctly handle these URLs
        for (let section = 1; section <= 4; section++) {  // Example: iterate over 4 sections
            smStream.write({ url: `/${test.test}/${section}`, changefreq: 'daily', priority: 0.7 });

            for (let question = 1; question <= 30; question++) {  // Example: iterate over 10 questions per section
                smStream.write({
                    url: `/${test.test}/${section}/${question}`,
                    changefreq: 'weekly',
                    priority: 0.9
                });
            }
        }
    }

    smStream.end();
    await streamToPromise(smStream);
    console.log('Sitemap generated successfully!');
}

async function fetchApi(url) {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        if (!response.ok) {  // Check if the response status is OK (200-299)
            console.error(`API request failed, status: ${response.status}, url: ${url}`);
            return { tests: [] };  // Return an empty array if the response is not ok
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch data from ${url}: `, error);
        return { tests: [] };  // Ensure to return an object with an empty tests array on error
    }
}




generateSitemap();
