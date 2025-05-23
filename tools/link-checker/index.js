import { chromium } from 'playwright';
import { URL } from 'url';
import https from 'https';
import http from 'http';

/* global process, console, setTimeout */

// Global array to track all links and their status
const links = [];

const baseURL = process.argv[2];
if (!baseURL) {
  console.error('Usage: node index.js https://example.com');
  process.exit(1);
}

// Number of parallel workers
const WORKERS = 5;

function isInternalLink(url) {
  return url.startsWith(baseURL);
}

function normalizeUrl(url) {
  try {
    return new URL(url, baseURL).href.split('#')[0];
  } catch {
    return null;
  }
}

// Add a URL to the global links array if it doesn't exist
function addLink(url, sourceUrl = null) {
  const normalizedUrl = normalizeUrl(url);
  if (!normalizedUrl || !isInternalLink(normalizedUrl)) return null;

  // Check if URL already exists in our array
  const existingLink = links.find((link) => link.url === normalizedUrl);
  if (existingLink) return existingLink;

  // Add new link with initial status
  const newLink = {
    url: normalizedUrl,
    processing: false,
    checked: false,
    active: false,
    crawled: false,
    source: sourceUrl,
  };

  links.push(newLink);
  return newLink;
}

// Function to check URL status using http/https (like curl)
async function checkUrlStatus(linkObj) {
  return new Promise((resolve) => {
    linkObj.processing = true;

    const url = linkObj.url;
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, (res) => {
      const statusCode = res.statusCode;

      linkObj.checked = true;
      linkObj.active = statusCode >= 200 && statusCode < 400;

      if (!linkObj.active) {
        console.error(`🚫 Error ${statusCode}: ${url}`);
      }

      resolve();
    });

    req.on('error', (error) => {
      linkObj.checked = true;
      linkObj.active = false;
      console.error(`❌ Connection error: ${url} - ${error.message}`);
      resolve();
    });

    req.setTimeout(10000, () => {
      req.destroy();
      linkObj.checked = true;
      linkObj.active = false;
      console.error(`⏱️ Timeout: ${url}`);
      resolve();
    });
  });
}

// Function to crawl a URL and find all links
async function crawlUrl(linkObj, browser) {
  if (!linkObj.active) return;

  console.log(`Crawling: ${linkObj.url}`);

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const response = await page.goto(linkObj.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    if (!response) {
      console.error(`❌ Failed to load page: ${linkObj.url}`);
      linkObj.crawled = true;
      return;
    }

    // Get links before JavaScript execution
    const linksBefore = await page.$$eval('a[href]', (anchors) => anchors.map((a) => a.href));
    console.log(`Links before JavaScript: ${linksBefore.length}`);

    // Wait for page to be fully loaded with JavaScript execution
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
      console.log(`Timeout waiting for networkidle on ${linkObj.url}`);
    });

    // Get links after JavaScript execution
    const linksAfter = await page.$$eval('a[href]', (anchors) => anchors.map((a) => a.href));
    console.log(`Links after JavaScript: ${linksAfter.length}`);
    console.log(`Difference: ${linksAfter.length - linksBefore.length}`);

    // Add all discovered links to our global array
    for (const url of linksAfter) {
      addLink(url, linkObj.url);
    }

    linkObj.crawled = true;
  } catch (error) {
    console.error(`Error crawling ${linkObj.url}: ${error.message}`);
    linkObj.crawled = true;
  } finally {
    await context.close();
  }
}

// Worker function to process links
async function worker(id, browser) {
  console.log(`Worker ${id} started`);

  let shouldContinue = true;
  while (shouldContinue) {
    // Find the next link to process based on criteria
    const linkToProcess = links.find(
      (link) => !link.processing && !link.checked && !link.active && !link.crawled
    );

    // If no more links to process, exit the worker
    if (!linkToProcess) {
      // Check if there are any links still being processed
      const anyProcessing = links.some((link) => link.processing);
      if (!anyProcessing) {
        // If nothing is being processed and we found nothing to process, we're done
        shouldContinue = false;
      } else {
        // Wait a bit and check again
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } else {
      try {
        // Mark as processing
        linkToProcess.processing = true;

        // Step 1: Check URL status (like curl)
        await checkUrlStatus(linkToProcess);

        // Step 2: If active, crawl to find more links
        if (linkToProcess.active) {
          await crawlUrl(linkToProcess, browser);
        } else {
          linkToProcess.crawled = true; // Mark as crawled if not active (no need to actually crawl)
        }
      } catch (error) {
        console.error(`Worker ${id} error processing ${linkToProcess.url}: ${error.message}`);
        // Ensure we mark as processed even if there was an error
        linkToProcess.checked = true;
        linkToProcess.crawled = true;
      } finally {
        // Mark as no longer processing
        linkToProcess.processing = false;
      }

      // Log progress periodically
      if (id === 0 && links.length % 10 === 0) {
        const checked = links.filter((link) => link.checked).length;
        const active = links.filter((link) => link.active).length;
        const crawled = links.filter((link) => link.crawled).length;
        console.log(
          `Progress: ${links.length} total, ${checked} checked, ${active} active, ${crawled} crawled`
        );
      }
    }
  }

  console.log(`Worker ${id} finished`);
}

// Main function
(async () => {
  // Add the initial URL to our list
  addLink(baseURL);

  // Launch browser for all workers to share
  const browser = await chromium.launch({ headless: true });

  // Start workers
  const workers = [];
  for (let i = 0; i < WORKERS; i++) {
    workers.push(worker(i, browser));
  }

  // Wait for all workers to complete
  await Promise.all(workers);

  // Close the browser
  await browser.close();

  // Print summary
  console.log('\n===== SUMMARY =====');
  console.log(`Total links found: ${links.length}`);
  console.log(`Active links: ${links.filter((link) => link.active).length}`);
  console.log(`Inactive links: ${links.filter((link) => link.checked && !link.active).length}`);

  // Print inactive links with their sources
  const inactiveLinks = links.filter((link) => link.checked && !link.active);
  if (inactiveLinks.length > 0) {
    console.log('\n===== INACTIVE LINKS =====');
    for (const link of inactiveLinks) {
      console.log(`${link.url}`);
      console.log(`  Found on: ${link.source || 'Initial URL'}`);
    }
  }

  console.log('✅ Done.');
})();
