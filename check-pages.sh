#!/bin/bash

# Simple script to check if all critical pages exist
echo "Checking critical pages..."

critical_pages=(
    "index.html"
    "contact.html" 
    "demo.html"
    "products/ai-agent-studio.html"
    "products/automation-co-pilot.html"
    "products/document-automation.html"
    "products/process-reasoning-engine.html"
    "solutions/industry/financial-services.html"
    "solutions/industry/healthcare.html"
    "solutions/function/shared-services.html"
    "resources/blog.html"
    "resources/customer-stories.html"
    "company/about-us.html"
    "company/careers.html"
    "legal/privacy.html"
    "legal/terms.html"
)

missing_pages=()

for page in "${critical_pages[@]}"; do
    if [ ! -f "$page" ]; then
        echo "❌ Missing: $page"
        missing_pages+=("$page")
    else
        echo "✅ Found: $page"
    fi
done

echo ""
if [ ${#missing_pages[@]} -eq 0 ]; then
    echo "🎉 All critical pages found!"
else
    echo "⚠️  Missing ${#missing_pages[@]} critical pages"
    echo "Missing pages need to be created:"
    printf '%s\n' "${missing_pages[@]}"
fi