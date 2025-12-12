#!/bin/bash

# Build script for deployment
echo "Building for production..."
npm run build

echo "Build complete! Deploy the .next folder to your hosting provider."
echo ""
echo "Files to deploy:"
echo "- .next/"
echo "- public/"
echo "- package.json"
echo "- next.config.js"
echo ""
echo "For Netlify: The build output is in .next folder"
