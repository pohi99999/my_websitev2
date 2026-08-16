const fs = require('fs');
const file = 'app/admin/crm/pipeline/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "const leadId = active.id;",
  "const leadId = Number(active.id);"
);

fs.writeFileSync(file, content);
