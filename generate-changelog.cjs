#!/usr/bin/env node
/* eslint-env node */
/* global require, __dirname, console, process, module */

const fs = require('fs');
const path = require('path');

// Function to convert DAST content to markdown
function convertDastToMarkdown(children, depth = 0) {
  if (!children || !Array.isArray(children)) return '';

  let markdown = '';

  for (const node of children) {
    switch (node.type) {
      case 'heading': {
        // Cap headings at H3 level (since we start with H2 Summary)
        const headingLevel = '#'.repeat(Math.min(node.level + 1, 3));
        const headingText = convertInlineContent(node.children);
        markdown += `${headingLevel} ${headingText}\n\n`;
        break;
      }

      case 'paragraph': {
        const paragraphText = convertInlineContent(node.children);
        markdown += `${paragraphText}\n\n`;
        break;
      }

      case 'list': {
        markdown += convertList(node, depth);
        break;
      }

      case 'codeBlock': {
        const language = node.language || '';
        markdown += `\`\`\`${language}\n${node.value}\n\`\`\`\n\n`;
        break;
      }
    }
  }

  return markdown;
}

// Function to convert inline content (spans, links, etc.)
function convertInlineContent(children) {
  if (!children || !Array.isArray(children)) return '';

  let text = '';

  for (const node of children) {
    if (node.type === 'span') {
      let content = node.value || '';

      // Apply formatting marks
      if (node.marks && Array.isArray(node.marks)) {
        for (const mark of node.marks) {
          switch (mark) {
            case 'strong':
              content = `**${content}**`;
              break;
            case 'code':
              content = `\`${content}\``;
              break;
            case 'emphasis':
              content = `*${content}*`;
              break;
          }
        }
      }

      text += content;
    } else if (node.type === 'link') {
      const linkText = convertInlineContent(node.children);
      text += `[${linkText}](${node.url})`;
    }
  }

  return text;
}

// Function to convert lists
function convertList(listNode, depth = 0) {
  if (!listNode.children || !Array.isArray(listNode.children)) return '';

  let markdown = '';
  const indent = '  '.repeat(depth);

  listNode.children.forEach((listItem, index) => {
    if (listItem.type === 'listItem') {
      const bullet = listNode.style === 'bulleted' ? '-' : `${index + 1}.`;

      // Process list item content
      let itemContent = '';
      if (listItem.children && Array.isArray(listItem.children)) {
        for (const child of listItem.children) {
          if (child.type === 'paragraph') {
            itemContent += convertInlineContent(child.children);
          } else if (child.type === 'list') {
            // Handle nested lists
            itemContent += '\n' + convertList(child, depth + 1);
          }
        }
      }

      markdown += `${indent}${bullet} ${itemContent}\n`;
    }
  });

  markdown += '\n';
  return markdown;
}

// Main function to process changelog
function processChangelog() {
  try {
    // Read the changelog JSON file
    const changelogPath = path.join(__dirname, 'fern/pages/changelog/changelog.json');
    const changelogData = JSON.parse(fs.readFileSync(changelogPath, 'utf8'));

    // Ensure output directory exists
    const outputDir = path.join(__dirname, 'fern/pages/changelog');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let processedCount = 0;

    // Process each changelog item
    for (const item of changelogData) {
      try {
        // Generate markdown content starting with summary
        let markdown = '';

        // Add the main content from DAST
        if (item.body && item.body.document && item.body.document.children) {
          markdown += convertDastToMarkdown(item.body.document.children);
        }

        // Write to file using publish_date as filename
        const filename = `${item.publish_date}.md`;
        const filepath = path.join(outputDir, filename);

        fs.writeFileSync(filepath, markdown, 'utf8');
        processedCount++;

        console.log(`✅ Generated: ${filename}`);
      } catch (itemError) {
        console.error(`❌ Error processing item ${item.id}:`, itemError.message);
      }
    }

    console.log(`\n🎉 Successfully processed ${processedCount} changelog items!`);
    console.log(`📁 Files saved to: ${outputDir}`);
  } catch (error) {
    console.error('❌ Error processing changelog:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  processChangelog();
}

module.exports = { processChangelog, convertDastToMarkdown };
