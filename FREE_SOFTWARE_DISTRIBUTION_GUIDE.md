# How to Host & Share Free Software/Tools on www.jobaeralam.com

Your `index.html` is already wired to serve free `.zip` downloads directly from the `downloads/` folder in your GitHub repository (auto-deployed to Azure App Service).

## Recommended Hosting Options
1. **GitHub Repo `downloads/` folder** (Best for tools under 100 MB): Upload `.zip` files directly into `downloads/`.
2. **GitHub Releases** (Best for large installers up to 2 GB): Create a Release and paste the direct asset URL into `downloadUrl` inside `FREE_TOOLS_CATALOG` in `index.html`.
3. **Azure Blob Storage** (Best for enterprise-scale bandwidth).

## Security Best Practices
- Package tools as `.zip` with a `README.txt`.
- Generate and publish SHA-256 checksums via PowerShell:
  `Get-FileHash .\YourTool.zip -Algorithm SHA256`
