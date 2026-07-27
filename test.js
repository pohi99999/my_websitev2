const { execSync } = require('child_process');

try {
  execSync('curl -I https://app.netlify.com/projects/pohankaestarsa/deploys/6a670bbc94488b00088ba028', { stdio: 'inherit' });
} catch (e) {
  console.log('failed');
}
