#!/bin/bash
########################################################
#
# doc-helper.sh
#
# _Internal functions are prefixed with an underscore._
#
# Here's a breakdown of every function and how it should operate:
#
# 1. **show_help**
#    - Displays usage instructions for all commands
#    - Shows examples for each command
#    - Returns 0/1
#
# 2. **create_backup**
#    - Creates a timestamped backup of docs.yml
#    - Sets the LATEST_BACKUP_FILE variable
#    - Returns 0/1
#
# 3. **move_file**
#    - Moves a file from source to target location
#    - Creates target directory if it doesn't exist
#    - Returns 0/1
#
# 4. **add_slug**
#    - Checks if a slug exists in a file's entry in docs.yml with _get_current_slug
#    - Gets the new slug with _get_new_slug
#    - Adds the slug to the entry in docs.yml if it doesn't exist
#    - Updates the entry in docs.yml with the new slug if it does exist
#    - Preserves all other fields in the entry
#    - Returns 0/1
#
# 5. **edit_frontmatter**
#    - Removes the slug line from a file's frontmatter
#    - Preserves all other frontmatter content
#    - Returns 0/1
#
# 6. **add_slug_to_yaml**
#    - Adds or updates a slug entry in docs.yml for a specific file
#    - Works with macOS-compatible sed commands (-i '')
#    - Maintains proper indentation and structure
#    - Adds path comment next to the slug
#
# 7. **add_redirect**
#    - Adds a redirect from old path to new path in docs.yml
#    - Updates existing redirect if source already exists
#    - Handles proper indentation
#
# 8. **sort_redirects_by_destination**
#    - Sorts all redirects in docs.yml by destination
#    - Preserves content before and after redirects section
#    - Maintains proper YAML structure
#
# 9. **remove_duplicate_redirects**
#    - Removes duplicate redirects based on identical source-destination pairs
#    - Creates backup before processing
#    - Reports statistics on removed duplicates
#
# 10. **build_url_path_from_yaml**
#     - Analyzes docs.yml structure to build full URL path for a file
#     - Traverses the hierarchy to construct the path
#     - Returns full path with proper nesting
#
# 11. **update_page_status**
#     - Updates status comments on page entries (Moved ✅, Slug ✅, Redirected ✅)
#     - Progressively adds status markers as steps complete
#     - Compatible with macOS sed
#
# 12. **migrate_file**
#     - Main function that handles complete file migration
#     - Handles special case for files in fern/docs directory
#     - Creates directory structure before moving
#     - Extracts slug from file and adds to YAML
#     - Removes slug from frontmatter
#     - Conditionally adds redirects based on file slug availability
#     - Updates status markers after each step
#
# 13. **migrate_all_files**
#     - Runs migrate_file on all .mdx files in a directory
#     - Recursively processes each file
#
# 14. **list_backups**
#     - Lists all available backups of docs.yml
#
# 15. **restore_backup**
#     - Restores docs.yml from a specified backup or latest backup
#     - Creates a pre-restore backup for safety
#
# The main command processing section handles the dispatch of these functions based on the command-line arguments.
#
# The script is designed to handle documentation file migration, slug management, and redirect handling, with special consideration for macOS compatibility and proper YAML structure preservation.
########################################################

# check yq is installed
if ! command -v yq &>/dev/null; then
    echo "yq could not be found. Please install it using 'brew install yq'."
    exit 1
fi

# Get the path to the docs.yml file
#
# e.g.
#   /Users/jason/fern/docs/docs.yml
_config_file() {
    return "$(find "$(pwd)" -name "docs.yml" -type f -print -quit)"
}

# Returns the entry for a given source file
#
# Given a path to a source file, returns the associative array entry for that entry how it exists in docs.yml
#
# Given: ./docs/guides/pages/genesys-deepgram.mdx
#
# Returns:
# {
#   "page": "Genesys and Deepgram",
#   "path": "./docs/guides/pages/genesys-deepgram.mdx",
#   "slug": "genesys-deepgram",
#   "hidden": true
# }
_get_entry() {
    local source_file="$1"
    local docs_yml_path=$(_config_file)
    local entry

    # Try to extract the entry using yq, catch any errors
    if ! entry=$(yq e '.[] | select(.path == "'"$source_file"'")' "$docs_yml_path"); then
        echo "Failed to retrieve entry for $source_file from $docs_yml_path"
        return 1
    fi

    echo "$entry"
    return 0
}

# Get the slug from the filename of a given path
_get_new_slug() {
    local source_file="$1"
    local slug=$(basename "$source_file" .mdx)

    return $slug
}

# Get the slug from the yaml of a given entry in docs.yml
_get_current_slug() {
    local source_file="$1"
    local entry=$(_get_entry "$source_file")
    local slug=$(yq e '.slug' "$entry")

    return $slug
}

# Get the `slug`` from the frontmatter of a given file
_get_old_slug() {
    local source_file="$1"
    local slug=$(yq e '.slug' "$source_file")

    return $slug
}

# DG directory
DG_DIR="./.dg"

LATEST_BACKUP_FILE=""

# Function to create a backup of the docs.yml file
# sets the LATEST_BACKUP_FILE variable
#
# e.g.
# $ ./doc-helper.sh create_backup
#
#   Created backup: docs.yml_backup_20210101_120000
create_backup() {
    local file_to_backup=$(_config_file)
    local backup_path="${DG_DIR}/fern"
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_name="docs.yml_backup_${timestamp}"
    local full_backup_path="${backup_path}/${backup_name}"

    # Create backup directory if it doesn't exist
    if ! mkdir -p "$(dirname "$full_backup_path")"; then
        echo "Failed to create backup directory at $full_backup_path"
        return 1
    fi

    # Create the backup file
    if ! cp "$file_to_backup" "$full_backup_path"; then
        echo "Failed to create backup file of $file_to_backup to $full_backup_path"
        return 1
    fi

    LATEST_BACKUP_FILE="$full_backup_path"

    echo "Created backup: $backup_name"
    return 0
}

# Move a file from source to target location
#
# e.g.
# $ ./doc-helper.sh move_file ./fern/docs/genesys-deepgram-legacy.mdx ./fern/pages/guides/pages/genesys-deepgram.mdx
#
#   Moved genesys-deepgram-legacy.mdx
#     from: ./fern/docs/genesys-deepgram-legacy.mdx
#     to: ./fern/pages/guides/pages/genesys-deepgram.mdx
move_file() {
    local source_file="$1"
    local target_file="$2"

    # Try to create target directory if it doesn't exist
    if ! mkdir -p "$(dirname "$target_file")"; then
        echo "Failed to create target directory for $target_file"
        exit 1
    fi

    # Try to move the file and catch any errors
    if ! mv "$source_file" "$target_file"; then
        echo "Failed to move $source_file to $target_file"
        exit 1
    fi

    echo "Moved $(basename "$source_file")"
    echo "  from: $source_file"
    echo "  to: $target_file"

    return 0
}

# 4. **add_slug**
#    - Checks if a slug exists in a file's entry in docs.yml with _get_current_slug
#    - Gets the new slug with _get_new_slug
#    - Adds the slug to the entry in docs.yml if it doesn't exist
#    - Updates the entry in docs.yml with the new slug if it does exist
#    - Preserves all other fields in the entry
#    - Returns 0/1
add_slug() {
    local source_file="$1"
    local new_slug="$2"

    # Checks if a slug exists in a file's entry in docs.yml with _get_current_slug
    local entry=$(_get_entry "$source_file")

    local current_slug=$(_get_current_slug "$source_file")
    local new_slug=$(_get_new_slug "$source_file")

    if [ "$current_slug" == "$new_slug" ]; then
        echo "Skipping $source_file because slug already exists"
        return 0
    fi

}

# Show the version of the script
#
# e.g.
# $ ./doc-helper.sh version
#
#   v0.1.0
show_version() {
    echo "v0.1.0"
}

# Show the help message
#
# e.g.
# $ ./doc-helper.sh help
#
#   Usage: $0 <command> [options]
#   Commands:
#     create_backup                   Create a backup of the docs.yml file
#     move_file <source> <target>     Move a file from source to target location
#     help                            Display this help message
#     version                         Display script version
show_help() {
    {
        echo "Usage: $0 <command> [options]"
        echo "Commands:"
        echo "  create_backup                   Create a backup of the docs.yml file"
        echo "  move_file <source> <target>     Move a file from source to target location"
        echo "  help                            Display this help message"
        echo "  version                         Display script version"
    } || {
        echo "Failed to display help message"
        exit 1
    }

    return 0
}

# Main command processing
command=$1
shift

case $command in
"create_backup")
    # outputs it's own notices and exits
    create_backup
    ;;

"move_file")
    move_file "$@"
    ;;

"version" | "-v" | "--version")
    show_version
    ;;

"help" | "-h" | "--help")
    show_help
    ;;

*)
    echo "Error: Unknown command '$command'"
    show_help
    exit 1
    ;;
esac
