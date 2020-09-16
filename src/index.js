const http = require('http');

function updateTime() {
  setInterval(() => {
   
    this.time = new Date().toUTCString()
    
  }, 1000);
    //  console.log('====',this.time )
    return this.time;
  
}

http
  .createServer((req, res) => {
    const { url } = req;
    if (url == '/') {
      res.end(`
            <html>
                Html update time:${updateTime()}
                <script src='main.js'></script>
            </html>
        `);
    } else if (url == '/main.js') {
        const document=`document.writeln('<br/>Js Update Time:${updateTime()}')`;
        // 强缓存
       /*  res.setHeader('Expires',new Date(Date.now()+10*1000).toUTCString());
        res.setHeader('Cacht-Control','max-age=20'); */

        // 协商缓存
        res.setHeader('Cache-Control','no-cache');
        res.setHeader('last-modified',new Date().toUTCString());
        console.log(']]]]',req.headers)
       if(new Date(req.headers['if-modified-since']).getTime()+3*1000>Date.now()){
           console.log('协商缓存中。。。。');
           res.statusCode=304;
           res.end();
           return;
       }
        res.statusCode=200;
        res.end(document);
    }else if(url=='/favicon.io'){
        res.end('')
    }
    res.end('Hello,world!!!!');
  })
  .listen(3000, () => {
    console.log('http服务启动，端口号为:' + 3000);
  });
