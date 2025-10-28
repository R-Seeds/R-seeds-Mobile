# Links Context Usage Guide

The Links Context provides a centralized way to manage deep linking, universal links, and sharing throughout your R-Seeds app.

## Basic Usage

```tsx
import { useLinks } from '@/contexts/LinksContext'
import { projectToLinkData } from '@/lib/share'

function ProjectCard({ project }) {
  const { shareLink, generateShareLink } = useLinks()
  
  const handleShare = async () => {
    const linkData = projectToLinkData(project)
    await shareLink(linkData, 'Check out this amazing project!')
  }
  
  return (
    <View>
      <Text>{project.title}</Text>
      <Button onPress={handleShare} title="Share Project" />
    </View>
  )
}
```

## Available Methods

### `generateShareLink(linkData)`
Creates shareable link with both web URL and deep link:
```tsx
const linkData = {
  id: '123',
  type: 'project',
  path: '/project/spotlight'
}

const shareableLink = generateShareLink(linkData)
// Returns: {
//   url: 'https://rseeds.app/project/spotlight/123',
//   deepLink: 'r-seeds://project/spotlight/123',
//   title: 'Check out this R-Seeds project',
//   description: 'Discover innovative projects...'
// }
```

### `shareLink(linkData, customMessage?)`
Share using native share dialog:
```tsx
await shareLink(linkData, 'Custom message here')
```

### `handleIncomingLink(url)`
Process incoming deep links (automatically handled):
```tsx
// Automatically called when app receives deep link
// You can also call manually:
const success = await handleIncomingLink('https://rseeds.app/project/spotlight/123')
```

### `parseLink(url)`
Parse URL into LinkData:
```tsx
const linkData = parseLink('https://rseeds.app/project/spotlight/123')
// Returns: { id: '123', type: 'project', path: '/project/spotlight' }
```

### `navigateToLink(linkData)`
Navigate to link destination:
```tsx
navigateToLink({
  id: '123',
  type: 'project',
  path: '/project/spotlight'
})
// Navigates to: /project/detail?id=123
```

## Link Types

### Project Links
```tsx
const projectLink = {
  id: 'project-123',
  type: 'project',
  path: '/project/spotlight'
}
```

### User Profile Links
```tsx
const userLink = {
  id: 'user-456',
  type: 'user',
  path: '/user/profile'
}
```

### Chat Links
```tsx
const chatLink = {
  id: 'chat-789',
  type: 'chat',
  path: '/chat/detail'
}
```

### Custom Links with Parameters
```tsx
const customLink = {
  id: 'item-123',
  type: 'custom',
  path: '/custom/page',
  params: {
    tab: 'details',
    highlight: 'true'
  }
}
```

## State Management

### Check Processing State
```tsx
const { isProcessingLink } = useLinks()

if (isProcessingLink) {
  return <LoadingSpinner />
}
```

### Get Last Handled Link
```tsx
const { lastHandledLink } = useLinks()

useEffect(() => {
  if (lastHandledLink) {
    console.log('Last link handled:', lastHandledLink)
  }
}, [lastHandledLink])
```

## Integration Examples

### Replace Legacy Share Function
```tsx
// Old way
import { share } from '@/lib/share'
await share(project)

// New way
import { useLinks } from '@/contexts/LinksContext'
import { projectToLinkData } from '@/lib/share'

const { shareLink } = useLinks()
const linkData = projectToLinkData(project)
await shareLink(linkData)
```

### Handle Deep Link Navigation
```tsx
function App() {
  const { lastHandledLink, isProcessingLink } = useLinks()
  
  useEffect(() => {
    if (lastHandledLink) {
      // Show toast or analytics
      console.log('Navigated from deep link:', lastHandledLink)
    }
  }, [lastHandledLink])
  
  return (
    <View>
      {isProcessingLink && <LoadingOverlay />}
      {/* Your app content */}
    </View>
  )
}
```

## URL Patterns

The context handles these URL patterns:

- **Project:** `https://rseeds.app/project/spotlight/123`
- **User:** `https://rseeds.app/user/profile/456`  
- **Chat:** `https://rseeds.app/chat/detail/789`
- **Deep links:** `r-seeds://project/spotlight/123`

## Error Handling

```tsx
const { shareLink, isValidLink } = useLinks()

const handleShare = async () => {
  try {
    if (!isValidLink(someUrl)) {
      throw new Error('Invalid link')
    }
    
    await shareLink(linkData)
  } catch (error) {
    console.error('Share failed:', error)
    // Show error toast
  }
}
```

## Testing Links

1. **Test deep links:** Send yourself a link via Messages
2. **Test universal links:** Open link in browser on device
3. **Test sharing:** Use share button and verify link format
4. **Test navigation:** Ensure proper screen navigation
