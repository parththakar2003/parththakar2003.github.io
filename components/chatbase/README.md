# Chatbase Widget Component

This directory contains the Chatbase AI chat widget integration for the portfolio website.

## Files

- `ChatbaseWidget.tsx` - Client-side React component that loads and initializes the Chatbase chat widget

## Usage

The widget is already integrated into the main layout and will automatically load on all pages when configured.

### Configuration

Set the following environment variable in your `.env.local` file:

```bash
NEXT_PUBLIC_CHATBASE_CHAT_ID=your_chat_widget_id
```

### How It Works

1. **Initialization Check**: Verifies if Chatbase is already initialized to prevent duplicate loading
2. **Queue Setup**: Creates a function queue to store calls made before the script loads
3. **Proxy Wrapper**: Wraps the function in a Proxy for method-style API calls
4. **Script Loading**: Dynamically loads the Chatbase embed script
5. **Graceful Degradation**: If not configured, logs a warning and doesn't load

### Type Safety

The component includes TypeScript definitions for the Chatbase function and window interface.

### Identity Verification

Identity verification is currently disabled for this static site deployment. See the main [CHATBASE_SETUP.md](../../CHATBASE_SETUP.md) in the root directory for instructions on enabling this feature with server-side rendering.

## Documentation

For complete setup instructions, troubleshooting, and security best practices, see:
- [CHATBASE_SETUP.md](../../CHATBASE_SETUP.md) - Comprehensive setup guide
- [.env.example](../../.env.example) - Environment variable templates

## Security

- ✅ No secrets in code
- ✅ Environment variable configuration
- ✅ Type-safe implementation
- ✅ Graceful error handling
