import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3006;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Reserve Books: API')
    .setVersion('1.0')
    .addTag('books')
    .addTag('auth')
    .setDescription(
      'Esta API REST permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en una colección de libros. La autenticación de usuarios se realiza para garantizar la seguridad de las operaciones. Aplicación del curso de Fullstack developer en NAO',
    )
    .setContact(
      'Linkedin',
      'https://www.linkedin.com/in/arturo-cer/',
      'jesus.cervantes207003@potros.itson.edu.mx',
    )
    .addServer('http://localhost:3006/api')
    .addServer('https://api-rest-nao-books-auth-production.up.railway.app/api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix('api');
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(PORT);
  console.log('Server corriendo en el puerto ' + PORT);
}
bootstrap();
