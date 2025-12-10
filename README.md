# Recruiting Agency Dashboard

A minimal, role-based dashboard for recruiting agencies with NocoDB backend integration.

This is a concept for a low-code/no-code solution based on a Whimsical mindmap (see assets folder). Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools.

-> [Mindmap](assets/mindmap.png)
-> [Figma Design](https://www.figma.com/proto/zYYXBP4raPeYrBNZqvXLWQ/Ohne-Namen?node-id=46-344&t=87ymcOr0WNYcJWX4-1)

## How to Use

1. Open `index.html` in your browser (or use a local server)
2. Select your role (Account Manager, Marketer, or Recruiter)
3. Navigate between sections using the sidebar icons
4. View customers, team members, job listings, tasks, and resources

The dashboard works with mock data by default. To connect to NocoDB, copy `config.js` to `config.local.js` and add your API credentials.

## Suggested NocoDB Schema

CSV files are included in the `tables/` folder—import them directly into NocoDB to get started:

- `Company (Default View).csv`
- `Team (Default View).csv`
- `Job listings (Default View).csv`
- `Job ads (Default View).csv`
- `Tasks (Default View).csv`
- `Applications (Default View).csv`
- `Company Rep (Default View).csv`

This is just the foundation—add relations between tables, custom fields, or automation workflows to build your ideal recruiting system. See `NOCODB_TABLES.md` for detailed schema information.

---

