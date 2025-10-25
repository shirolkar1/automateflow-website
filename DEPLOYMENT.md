# GitHub Pages Deployment Instructions

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository `automation-anywhere-clone`
4. Make sure it's set to "Public" (required for free GitHub Pages)
5. Don't initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub

Open Terminal and run these commands from your project directory:

```bash
# Navigate to your project directory
cd "/Users/alokeshirolkar/Library/CloudStorage/GoogleDrive-alokeshirolkar@gmail.com/My Drive/website/automation-anywhere-clone"

# Add your GitHub repository as the remote origin
git remote add origin https://github.com/shirolkar1/automation-anywhere-clone.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on the "Settings" tab (far right in the repository menu)
3. Scroll down to the "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

## Step 4: Access Your Website

After a few minutes, your website will be available at:
```
https://shirolkar1.github.io/automation-anywhere-clone
```

GitHub will also show you the URL in the Pages settings section.

## Step 5: Automatic Deployments

Now, whenever you make changes to your code and push to the main branch, GitHub Pages will automatically update your website:

```bash
# Make your changes, then:
git add .
git commit -m "Your commit message"
git push
```

## Custom Domain (Optional)

If you want to use a custom domain:

1. In the Pages settings, add your domain in the "Custom domain" field
2. Create a CNAME file in your repository root with your domain name
3. Set up DNS records with your domain provider

## Troubleshooting

- **Site not loading?** Wait 5-10 minutes after enabling Pages
- **404 error?** Make sure your main file is named `index.html`
- **CSS/JS not loading?** Check that all file paths are relative (no leading `/`)
- **Images not showing?** Make sure image paths are correct and files exist

## Security Note

Remember that this is a clone for educational purposes. The original design and content belong to Automation Anywhere, Inc. Don't use this for commercial purposes.

## Next Steps

Once deployed, you can:
- Share the live URL with others
- Continue making improvements
- Add more pages
- Optimize performance
- Add analytics

Your website will be live and accessible to anyone on the internet!