import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'index.html',
  'package.json',
  'vite.config.js',
  'src/App.jsx',
  'src/MainShowcase.jsx',
  'src/main.jsx',
  'src/styles.css',
];
const missingFiles = requiredFiles.filter((file) => !existsSync(join(projectRoot, file)));
const nodeMajorVersion = Number(process.versions.node.split('.')[0]);

if (process.cwd() !== projectRoot) {
  console.error(`\n[NOVA] Sai thư mục chạy lệnh.\nHiện tại: ${process.cwd()}\nCần dùng: ${projectRoot}\n`);
  process.exit(1);
}

if (nodeMajorVersion < 18) {
  console.error(`\n[NOVA] Node.js ${process.versions.node} quá cũ. Hãy cài Node.js 18 trở lên.\n`);
  process.exit(1);
}

if (missingFiles.length > 0) {
  console.error(`\n[NOVA] Thiếu file bắt buộc:\n- ${missingFiles.join('\n- ')}\nHãy tải lại toàn bộ repository, không chép riêng App.jsx.\n`);
  process.exit(1);
}

const nestedProjects = readdirSync(projectRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !['node_modules', '.git', 'dist', 'src', 'scripts'].includes(entry.name))
  .map((entry) => join(projectRoot, entry.name))
  .filter((directory) => statSync(directory).isDirectory() && existsSync(join(directory, 'package.json')));

if (nestedProjects.length > 0) {
  console.warn(`\n[NOVA] Cảnh báo: tìm thấy project lồng bên trong:\n- ${nestedProjects.join('\n- ')}\nKhông chạy Vite từ các thư mục này.\n`);
}

console.log('[NOVA] Cấu trúc project hợp lệ.');
