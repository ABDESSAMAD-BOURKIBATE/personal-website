import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Helper: recursively copy a directory
function copyDir(src, dest) {
    if (!existsSync(src)) return;
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src)) {
        const srcPath = join(src, entry);
        const destPath = join(dest, entry);
        if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            copyFileSync(srcPath, destPath);
        }
    }
}

// Helper: copy a single file if it exists
function copyIfExists(src, dest) {
    if (existsSync(src)) {
        const dir = dest.substring(0, dest.lastIndexOf('/') === -1 ? dest.lastIndexOf('\\') : dest.lastIndexOf('/'));
        if (dir && !existsSync(dir)) mkdirSync(dir, { recursive: true });
        copyFileSync(src, dest);
    }
}

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                projects: 'projects/index.html',
                publications: 'publications/index.html'
            }
        }
    },
    plugins: [
        {
            name: 'copy-static-assets',
            closeBundle() {
                // Copy entire assests directory (JS, images, CSS, CV, etc.)
                copyDir('assests', 'dist/assests');

                // Copy JSON data files used by fetch() at runtime
                copyIfExists('education.json', 'dist/education.json');
                copyIfExists('skills.json', 'dist/skills.json');

                // Copy sub-pages and project data
                copyDir('experience', 'dist/experience');
                copyDir('projects', 'dist/projects');
                copyDir('publications', 'dist/publications');

                // Copy GitHub Pages specific files
                copyIfExists('404.html', 'dist/404.html');
                copyIfExists('CNAME', 'dist/CNAME');
                copyIfExists('ads.txt', 'dist/ads.txt');

                console.log('✅ Static assets copied to dist/ successfully!');
            }
        }
    ]
});
