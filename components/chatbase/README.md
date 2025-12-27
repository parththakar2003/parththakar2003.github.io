# Chatbase Widget Component

This directory contains the Chatbase chat widget integration for the portfolio website.

## Files

- `ChatbaseWidget.tsx` - Client-side React component that loads the Chatbase floating chat widget
- `ChatbaseIframe.tsx` - (Legacy) Iframe-based component (not currently used)

## Usage

The widget is already integrated into the main layout and will automatically display as a floating chat button in the bottom-right corner on all pages.

### How It Works

The component dynamically loads the Chatbase embed script which creates a floating chat button. The widget requires the `NEXT_PUBLIC_CHATBASE_CHAT_ID` environment variable to be set.

### Configuration

1. Set the environment variable in `.env.local`:
   ```
   NEXT_PUBLIC_CHATBASE_CHAT_ID=your_chat_id_here
   ```

2. For production deployment, configure the environment variable in your hosting platform's settings.

### Type Safety

The component is built with TypeScript for type safety and includes proper Window interface extensions for the Chatbase API.

## Security

- ✅ No secrets in code
- ✅ Environment variable for configuration
- ✅ Secure script loading
- ✅ Type-safe implementation
