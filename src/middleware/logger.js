const { db } = require('../models/db');

exports.logger = async (req, res, next) => {
  if (req.url.startsWith('/api')) {
    /* Response Time calc */
    const start = Date.now();
    /* Response Time calc */
    const logObject = {
      method: req.method,
      route: req.url,
      params: JSON.stringify(req.params),
      query: JSON.stringify(req.query),
      ip: req.ip,
      clientAgent: req.headers['user-agent'],
    };
    // Bind to response Finish event
    res.on('finish', async () => {
      logObject.responseTime = Date.now() - start;
      logObject.status = res.statusCode;
      // User check
      try {
        logObject.user = res.locals.user._id || null;
      } catch (e) {
        // Do nothing
      }
      logObject.message = res.locals.message || 'not found... ';
      logObject.contentLength = res.getHeaders()['content-length'];

      // Saving to DB
      await db.Logger.create(logObject);
      // console log
      // console.log(logObject);
    });

    next();
  } else {
    next();
  }
};

/* 
  ***Sample Log Object***
  
    {
      method: 'GET',
      route: '/api/v1/menu',
      params: '{}',
      query: '{}',
      ip: '::ffff:127.0.0.1',
      clientAgent: 'PostmanRuntime/7.32.1',
      responseTime: '76 ms',
      status: 200,
      user: new ObjectId('65d73137df37dc2a8e860826'),
      message: 'Menu found successfully',
      contentLength: '15495'
    }

*/
