import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import './modules/restaurant/subscriptions';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Restaurant API')
		.setDescription('Restaurant API description')
		.setVersion('1.0')
		.addTag('restaurant')
		.addTag('booking')
		.addTag('availability')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-doc', app, document);

	await app.listen(configService.get('NEST_PORT'));
}
bootstrap();
