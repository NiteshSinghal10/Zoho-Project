import express from 'express';
import morgan from 'morgan';

export const appLoader = async (app: express.Application, router: express.Router) => {
  try {
    const port = process.env.PORT || 3000;

    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', router);
    app.use((req, res) => {
      res.status(404)
      .send({
        success: false,
        data: undefined,
        message: 'the resource you are looking for is not found.'
      });
    });

    app.listen(port, () => console.log(`Server is running on port: ${port}`));
    
  }catch(error) {
    console.log(error);
  }
}

