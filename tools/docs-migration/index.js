#!/usr/bin/env node

/* global process, console */

/**
 * Docs Migration Tool
 *
 * This script helps migrate documentation files according to the structure defined in fern/docs.yml.
 * It can:
 * - Parse the docs.yml file to extract tabs, navigation, and redirects
 * - Build a complete slug for a page by combining parent/ancestor slugs
 * - Move files from their current location to a new location in fern/pages with appropriate directory structure
 * - Remove old slugs from frontmatter
 * - Update existing redirects that point to the old slug
 * - Add new redirects from old slugs to new slugs
 *
 * Usage:
 * 1. Run the script: node index.js
 * 2. Select a page to process from the list
 * 3. The script will process the page and update docs.yml with new redirects
 *
 * Options:
 * --dry-run            Preview changes without making any modifications to files or docs.yml
 * --verbose            Show more detailed output
 * --path <filepath>    Process a specific page by its path in docs.yml (e.g., docs/diarization.mdx)
 * --all                Process all pages (CAUTION: This will process all pages)
 */

import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';

// Get current file path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line options
const program = new Command();
program
  .option('-d, --dry-run', 'Preview changes without making any modifications')
  .option('-v, --verbose', 'Show more detailed output')
  .option(
    '-p, --path <filepath>',
    'Process a specific page by its path in docs.yml (e.g., docs/diarization.mdx)'
  )
  .option('-a, --all', 'Process all pages (CAUTION: This will process all pages)')
  .parse(process.argv);
const options = program.opts();

// Paths
const ROOT_DIR = path.resolve(__dirname, '../..');
const FERN_DIR = path.join(ROOT_DIR, 'fern');
const DOCS_YML_PATH = path.join(FERN_DIR, 'docs.yml');
const PAGES_DIR = path.join(FERN_DIR, 'pages');

/**
 * Log a message with optional indentation
 */
function log(message, indent = 0) {
  const prefix = options.dryRun ? '[DRY] ' : '';
  const indentation = ' '.repeat(indent);
  console.log(`${prefix}${indentation}${message}`);
}

/**
 * Parse the docs.yml file
 */
function parseDocsYml() {
  try {
    const yamlContent = fs.readFileSync(DOCS_YML_PATH, 'utf8');
    return yaml.load(yamlContent);
  } catch (error) {
    log(`Error parsing docs.yml: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Save the updated docs.yml file
 */
function saveDocsYml(docsYaml) {
  if (options.dryRun) {
    log('DRY RUN: Would save updated docs.yml');
    return;
  }

  try {
    const updatedYaml = yaml.dump(docsYaml, {
      lineWidth: -1,
      noRefs: true,
      quotingType: '"',
    });

    fs.writeFileSync(DOCS_YML_PATH, updatedYaml, 'utf8');
    log('Successfully saved updated docs.yml');
  } catch (error) {
    log(`Error saving docs.yml: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Extract all pages from the navigation structure
 */
function extractAllPages(docsYaml) {
  const { tabs, navigation } = docsYaml;
  const allPages = [];

  for (const section of navigation) {
    if (!section.tab || !tabs[section.tab]) {
      continue;
    }

    const tabInfo = tabs[section.tab];
    const tabSlug = tabInfo.slug || section.tab;
    const skipTabSlug = tabInfo['skip-slug'] === true;

    extractPagesFromSection(section.layout, [], tabSlug, skipTabSlug, allPages);
  }

  return allPages.filter((page) => page.type === 'page');
}

/**
 * Extract pages from a section recursively
 */
function extractPagesFromSection(items, parentPath, tabSlug, skipTabSlug, result) {
  if (!items || !Array.isArray(items)) {
    return;
  }

  for (const item of items) {
    const currentPath = [...parentPath];

    // Build the path for this item
    if (item.slug) {
      currentPath.push(item.slug);
    } else if (item['skip-slug'] !== true && (item.page || item.section)) {
      // Generate slug from title
      const title = item.page || item.section;
      const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      currentPath.push(generatedSlug);
    }

    // If it's a page, add it to results
    if (item.page && item.path) {
      result.push({
        type: 'page',
        title: item.page,
        filePath: item.path,
        parents: [...parentPath],
        fullPath: [...currentPath],
        tabSlug,
        skipTabSlug,
        originalItem: item,
      });
    }

    // If it's a section, process its contents
    if (item.section && item.contents) {
      result.push({
        type: 'section',
        title: item.section,
        fullPath: [...currentPath],
        tabSlug,
        skipTabSlug,
      });

      extractPagesFromSection(item.contents, currentPath, tabSlug, skipTabSlug, result);
    }
  }
}

/**
 * Find a page by its path in the docs.yml
 */
function findPageByPath(pages, targetPath) {
  log(`Finding page for path: ${targetPath}`);

  const normalizedPath = targetPath.trim().replace(/^\.\//, '');

  const page = pages.find(
    (p) =>
      p.filePath === normalizedPath ||
      p.filePath === `./${normalizedPath}` ||
      p.filePath.endsWith(`/${normalizedPath}`)
  );

  if (!page) {
    log(`No page found with path: ${targetPath}`);
    return null;
  }

  log(`Found page: ${page.title}`);
  return page;
}

/**
 * Extract the slug from a file's frontmatter
 */
function extractSlugFromFile(filePath) {
  const fullPath = path.resolve(FERN_DIR, filePath);

  if (!fs.existsSync(fullPath)) {
    log(`File not found: ${fullPath}`);
    return null;
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(content);

    if (data.slug) {
      log(
        `Removing old slug from file (we need to remember what we remove for later): ${data.slug}`
      );
      return data.slug;
    } else {
      log('No slug found in frontmatter');
      return null;
    }
  } catch (error) {
    log(`Error reading file: ${error.message}`);
    return null;
  }
}

/**
 * Calculate new slug based on filename
 */
function calculateNewSlug(filePath) {
  const fileBaseName = path.basename(filePath, path.extname(filePath));
  log(`Calculating new slug: ${fileBaseName}`);
  return fileBaseName;
}

/**
 * Calculate full HTTP path based on navigation hierarchy, respecting skip-slug
 */
function calculateFullPath(page) {
  const pathParts = [];

  // Add tab slug if not skipped
  if (page.tabSlug && !page.skipTabSlug) {
    pathParts.push(page.tabSlug);
  }

  // Add all path components
  pathParts.push(...page.fullPath);

  const fullPath = `/${pathParts.join('/')}`;
  log(`Calculating HTTP path: ${fullPath}`);

  return fullPath;
}

/**
 * Calculate full file path including all hierarchy parts regardless of skip-slug
 */
function calculateFilePath(page) {
  const pathParts = [];

  // Always add tab slug for file organization
  if (page.tabSlug) {
    pathParts.push(page.tabSlug);
  }

  // Add all path components
  pathParts.push(...page.fullPath);

  const filePath = pathParts.join('/');
  log(`Calculating file path: ${filePath}`);

  return filePath;
}

/**
 * Generate the target file path
 */
function generateTargetPath(fullPath, filePath) {
  // Use the file path for directory structure (always includes tab slug)
  const pathParts = filePath.split('/');

  // Create the target directory path
  const targetDir = path.join(PAGES_DIR, ...pathParts.slice(0, -1));

  // Create the filename
  const filename = `${pathParts[pathParts.length - 1]}.mdx`;

  // Full path to the target file
  const targetPath = path.join(targetDir, filename);

  // Relative path for docs.yml - uses the HTTP path components but with file extension
  const relativePath = `./pages/${filePath}`.replace(/\/+$/, '') + '.mdx';

  log(`Moving file to new path: ${relativePath}`);

  return {
    dir: targetDir,
    path: targetPath,
    relativePath,
  };
}

/**
 * Process redirects for a page
 */
function processRedirects(docsYaml, oldSlug, fullPath, docsPath) {
  log('Finding old slug redirects:');
  const redirects = docsYaml.redirects || [];
  let changed = false;

  // Check for redirects with the old slug as source
  if (oldSlug) {
    const oldSlugPath = `/${oldSlug}`;
    const redirectWithSource = redirects.find((r) => r.source === oldSlugPath);

    if (redirectWithSource) {
      log(`- Found redirect with source: ${oldSlugPath}`, 2);
      log(`  Updating redirect destination to new slug: ${fullPath}`, 2);

      if (!options.dryRun) {
        redirectWithSource.destination = fullPath;
        changed = true;
      }
    } else {
      log(`- Didn't find redirect with source: ${oldSlugPath}`, 2);
      log(`  Adding new redirect with source: ${oldSlugPath} and destination: ${fullPath}`, 2);

      if (!options.dryRun) {
        redirects.push({
          source: oldSlugPath,
          destination: fullPath,
        });
        changed = true;
      }
    }

    // Check for redirects with the old slug as destination
    const redirectsWithDest = redirects.filter((r) => r.destination === oldSlugPath);

    if (redirectsWithDest.length > 0) {
      for (const redirect of redirectsWithDest) {
        log(`- Found redirect with destination: ${oldSlugPath}`, 2);
        log(`  Updating redirect destination to new slug: ${fullPath}`, 2);

        if (!options.dryRun) {
          redirect.destination = fullPath;
          changed = true;
        }
      }
    }
  }

  // Check if we need to create a redirect from the docs path
  if (docsPath && docsPath.startsWith('docs/')) {
    const oldDocsPath = `/${docsPath.replace(/\.mdx?$/, '')}`;
    const redirectWithDocsPath = redirects.find((r) => r.source === oldDocsPath);

    if (redirectWithDocsPath) {
      log(`- Found redirect with source: ${oldDocsPath}`, 2);
      log(`  Updating redirect destination to new slug: ${fullPath}`, 2);

      if (!options.dryRun) {
        redirectWithDocsPath.destination = fullPath;
        changed = true;
      }
    } else {
      log(`- Didn't find redirect with source: ${oldDocsPath}`, 2);
      log(`  Adding new redirect with source: ${oldDocsPath} and destination: ${fullPath}`, 2);

      if (!options.dryRun) {
        redirects.push({
          source: oldDocsPath,
          destination: fullPath,
        });
        changed = true;
      }
    }
  }

  docsYaml.redirects = redirects;
  return changed;
}

/**
 * Display the navigation entry for a page
 */
function displayNavigationEntry(page, newPath = null, newSlug = null) {
  log(`          - page: ${page.title}`, 2);
  log(`            path: ${newPath || page.filePath}`, 2);

  // If we have a new slug, display it; otherwise display existing slug if present
  if (newSlug) {
    log(`            slug: ${newSlug}`, 2);
  } else if (page.originalItem.slug) {
    log(`            slug: ${page.originalItem.slug}`, 2);
  }
}

/**
 * Update a file and move it to the new location
 */
function updateAndMoveFile(sourcePath, targetInfo, oldSlug) {
  if (options.dryRun) {
    log('DRY RUN: Would update and move file');
    return true;
  }

  try {
    // Check if source and destination are the same file
    const isSameFile = path.resolve(sourcePath) === path.resolve(targetInfo.path);

    if (isSameFile) {
      log(`Source and destination are the same file: ${sourcePath}`);

      // If they're the same, we only need to update the frontmatter
      const content = fs.readFileSync(sourcePath, 'utf8');
      const { data: frontmatter, content: fileContent } = matter(content);

      // Remove the old slug if present
      if (oldSlug) {
        delete frontmatter.slug;

        // Update the file in place
        const newContent = matter.stringify(fileContent, frontmatter);
        fs.writeFileSync(sourcePath, newContent);
        log(`Updated frontmatter in place for: ${sourcePath}`);
      }

      return true;
    }

    // Read the file
    const content = fs.readFileSync(sourcePath, 'utf8');
    const { data: frontmatter, content: fileContent } = matter(content);

    // Remove the old slug
    if (oldSlug) {
      delete frontmatter.slug;
    }

    // Create the new content
    const newContent = matter.stringify(fileContent, frontmatter);

    // Create the target directory if it doesn't exist
    fs.mkdirpSync(targetInfo.dir);

    // Write the file to the new location
    fs.writeFileSync(targetInfo.path, newContent);

    // Delete the original file (this makes it a true move operation)
    // Only if source and destination are different
    log(`Deleting original file: ${sourcePath}`);
    fs.unlinkSync(sourcePath);

    return true;
  } catch (error) {
    log(`Error updating and moving file: ${error.message}`);
    return false;
  }
}

/**
 * Process a single page
 */
async function processPage(page, docsYaml) {
  // 1. Extract the old slug from the file
  const oldSlug = extractSlugFromFile(page.filePath);

  // 2. Calculate new slug and paths
  const newSlug = calculateNewSlug(page.filePath);

  // Calculate HTTP path (for redirects) - respects skip-slug
  const fullPath = calculateFullPath(page);

  // Calculate file path (for file system) - always includes tab slug
  const filePath = calculateFilePath(page);

  // 3. Generate target path
  const targetInfo = generateTargetPath(fullPath, filePath);

  // 4. Display the navigation entry
  log('Found this page in the navigation:');
  displayNavigationEntry(page);

  log('Changing to:');
  displayNavigationEntry(page, targetInfo.relativePath, newSlug);

  // 5. Process redirects
  const redirectsChanged = processRedirects(docsYaml, oldSlug, fullPath, page.filePath);

  // 6. Update the file and move it
  const sourcePath = path.resolve(FERN_DIR, page.filePath);
  const fileUpdated = updateAndMoveFile(sourcePath, targetInfo, oldSlug);

  // 7. Update the navigation entry
  if (!options.dryRun && fileUpdated) {
    page.originalItem.path = targetInfo.relativePath;
    // Add the slug to the navigation item
    page.originalItem.slug = newSlug;
    log('Updated navigation entry in docs.yml');
  }

  return fileUpdated || redirectsChanged;
}

/**
 * Process multiple pages
 */
async function processAllPages(pages, docsYaml) {
  log(`Processing ${pages.length} pages:`);
  let totalChanged = false;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    log(`\nProcessing page ${i + 1}/${pages.length}: ${page.title}`);

    try {
      const changed = await processPage(page, docsYaml);
      if (changed) totalChanged = true;
    } catch (error) {
      log(`Error processing page: ${error.message}`);
    }
  }

  return totalChanged;
}

/**
 * Main function
 */
async function main() {
  try {
    log('=== DEEPGRAM DOCS MIGRATION TOOL ===');

    if (options.dryRun) {
      log('Running in DRY RUN mode - no changes will be made');
    }

    // Parse the docs.yml file
    log('Reading docs.yml file...');
    const docsYaml = parseDocsYml();

    // Extract all pages
    log('Extracting pages from navigation structure...');
    const pages = extractAllPages(docsYaml);
    log(`Found ${pages.length} pages in docs.yml`);

    if (pages.length === 0) {
      log('No pages found to process');
      return;
    }

    let changed = false;

    // Process based on options
    if (options.path) {
      // Process a specific page
      const targetPage = findPageByPath(pages, options.path);

      if (!targetPage) {
        log(`Could not find page with path: ${options.path}`);
        log('Available paths (first 10):');
        pages.slice(0, 10).forEach((p) => log(`  ${p.filePath}`, 2));
        if (pages.length > 10) log(`  ... and ${pages.length - 10} more`, 2);
        return;
      }

      changed = await processPage(targetPage, docsYaml);
    } else if (options.all) {
      // Process all pages
      log('Preparing to process all pages');

      if (!options.dryRun) {
        const { confirm } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirm',
            message:
              'Are you sure you want to process ALL pages? This will modify files and update docs.yml.',
            default: false,
          },
        ]);

        if (!confirm) {
          log('Operation cancelled by user');
          return;
        }
      }

      changed = await processAllPages(pages, docsYaml);
    } else {
      // Let user select a page
      log('Please select a page to process:');

      const { selectedIndex } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedIndex',
          message: 'Select a page:',
          choices: pages.map((page, index) => ({
            name: `${page.title} (${page.filePath})`,
            value: index,
          })),
        },
      ]);

      const selectedPage = pages[selectedIndex];
      log(`Selected: ${selectedPage.title}`);

      changed = await processPage(selectedPage, docsYaml);
    }

    // Save the updated docs.yml if changes were made
    if (changed) {
      saveDocsYml(docsYaml);
    } else {
      log('No changes were made');
    }

    log('=== PROCESS COMPLETE ===');
  } catch (error) {
    log(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
main().catch((err) => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
