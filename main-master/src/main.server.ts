import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { AppServerModule } from './app/app-server.module';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';

enableProdMode();
const app = express();
let compression = require('compression');
app.use(compression());
const port = 7000;
const baseUrl = `http://localhost:${port}`;

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use('/', express.static('dist/jit', { index: false }));

app.get('*', function (req, res, next) {
//  console.time(`GET: ${req.originalUrl}`);
  res.render('../dist/jit/index', {
    req: req,
    res: res
  });
//  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(7000, () => {
  console.log(`SERVER JIT Listening at ${baseUrl}`);
});
