import '@deepgram/web-components/deepgram-header'

const FERN_HEADER_CONTAINER_ID = 'fern-header'
const NEXT_CONTAINER_ID = '__next'
const DEEPGRAM_HEADER_CONTAINER_ID = 'deepgram-header'

/**
 * Load the Deepgram header component
 */
function loadHeader() {
  const deepgramHeaderId = document.getElementById(DEEPGRAM_HEADER_CONTAINER_ID)
  const fernHeaderContainer = document.getElementById(FERN_HEADER_CONTAINER_ID)

  if (!deepgramHeaderId && fernHeaderContainer) {
    try {
      const deepgramContentWrapper = document.createElement('deepgram-header')
      deepgramContentWrapper.setAttribute('id', DEEPGRAM_HEADER_CONTAINER_ID)
      deepgramContentWrapper.setAttribute('active', 'docs')
      fernHeaderContainer.insertBefore(deepgramContentWrapper, fernHeaderContainer.firstChild)
    } catch (error) {
      // Silently fail
    }
  }
}

/**
 * Observe DOM changes to ensure header is present
 */
function observeHeaderChanges() {
  const config = { childList: true, subtree: true }
  let headerAttempts = 0
  const MAX_ATTEMPTS = 50

  const callback: MutationCallback = (mutations, observer) => {
    const relevantMutations = mutations.filter(mutation => {
      const target = mutation.target as HTMLElement
      return target.id === FERN_HEADER_CONTAINER_ID || 
             target.id === NEXT_CONTAINER_ID ||
             mutation.removedNodes.length > 0
    })

    if (relevantMutations.length === 0) return

    if (!document.getElementById(DEEPGRAM_HEADER_CONTAINER_ID)) {
      loadHeader()
    }
    
    headerAttempts++
    if (headerAttempts >= MAX_ATTEMPTS) {
      observer.disconnect()
    }
  }

  const observer = new MutationObserver(callback)
  
  const startObserving = () => {
    const targetNode = document.getElementById(NEXT_CONTAINER_ID) || document.body
    observer.observe(targetNode, config)
  }

  startObserving()
}

const initialize = () => {
  loadHeader()
  observeHeaderChanges()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize)
} else {
  initialize()
}

window.addEventListener('load', () => {
  if (!document.getElementById(DEEPGRAM_HEADER_CONTAINER_ID)) {
    loadHeader()
  }
})
