// create koa server
import Koa from 'koa';
import Router from 'koa-router';
import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';

const app = new Koa();
const router = Router({});


// Endpoint to render the HTML page with embedded video
router.get('/', async (ctx, next) => {
    const templatePath = path.join(process.cwd(), 'src/index.ejs');
    const videoStreamUrl = '/stream'; // URL to the video stream endpoint
  
    // Read the HTML template and render it with the video stream URL
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const renderedHtml = ejs.render(templateContent, { videoStreamUrl });
  
    ctx.type = 'html';
    ctx.body = renderedHtml;
  });

// route /api to say hellow world
router.get('/stream', async (ctx, next) => {
    const filePath = path.join(process.cwd(), 'videos/dummy.mp4');
    const stat = fs.statSync(filePath);
    ctx.set('Cache-Control', 'no-cache');
    ctx.set('Content-Type', 'video/mp4');
    ctx.set('Content-Length', stat.size);
    ctx.set('Content-Disposition', 'inline; filename=example.mp4');

    const readStream = fs.createReadStream(filePath);
    ctx.body = readStream;
}
);

app.use(router.routes());
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});