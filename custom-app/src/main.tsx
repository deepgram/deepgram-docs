import '@deepgram/web-components/deepgram-header'

const FERN_HEADER_CONTAINER_ID = 'fern-header'
const NEXT_CONTAINER_ID = '__next'
const DEEPGRAM_HEADER_CONTAINER_ID = 'deepgram-header'

/**
 * Registers a MutationObserver to the first object with the specified value of the ID attribute.
 * @param {string} elementId String that specifies the ID value.
 */
function registerObserverById(elementId: string) {
  let observations = 0

  /**
   * Get element to observe
   */
  const targetNode = document.getElementById(elementId)

  if (targetNode) {
    /**
     * Options for the observer (which mutations to observe).
     */
    const config = { childList: true, subtree: true }

    /**
     * Callback function to execute when mutations are observed.
     */
    const callback: MutationCallback = async (
      e: MutationRecord[],
      o: MutationObserver,
    ) => {
      observableChanges()

      for (const item of e) {
        if (item.target instanceof HTMLElement) {
          const target = item.target
          if (target.id === 'fern-header') {
            if (observations < 3) {
              // react hydration will trigger a mutation event
              observations++
            } else {
              o.disconnect()
            }
            break
          }
        }
      }
    }

    /**
     * Create an observer instance linked to the callback function.
     */
    const observer = new MutationObserver(callback)

    /**
     * Start observing the target node for configured mutations.
     */
    observer.observe(targetNode, config)
  }
}

/**
 * Load custom components
 */
function loadCustomComponents() {
  const deepgramHeaderId = document.getElementById(DEEPGRAM_HEADER_CONTAINER_ID)

  if (!deepgramHeaderId) {
    // Create a header using the @deepgram/web-components/deepgram-header web component
    const deepgramContentWrapper = document.createElement('deepgram-header')
    deepgramContentWrapper.setAttribute('id', DEEPGRAM_HEADER_CONTAINER_ID)
    deepgramContentWrapper.setAttribute('active', 'docs') // this is the value of the active site (docs here)

    // Get or create fern-header container
    let fernHeaderContainer = document.getElementById(FERN_HEADER_CONTAINER_ID)
    if (!fernHeaderContainer) {
      fernHeaderContainer = document.createElement('div')
      fernHeaderContainer.setAttribute('id', FERN_HEADER_CONTAINER_ID)
      document.body.appendChild(fernHeaderContainer)
    }

    // Insert deepgram header at the beginning of fern-header
    fernHeaderContainer.insertBefore(
      deepgramContentWrapper,
      fernHeaderContainer.firstChild,
    )
  }
}

/**
 * Changes once the page has initialized.
 */
function launchChanges() {
  loadCustomComponents()
  console.clear()
}

/**
 * Changes that run when #Explorer mutations are observed.
 */
function observableChanges() {
  loadCustomComponents()
}

window.onload = function () {
  // Initial page changes.
  launchChanges()
  registerObserverById(NEXT_CONTAINER_ID)
}
