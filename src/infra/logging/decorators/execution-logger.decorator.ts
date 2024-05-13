import { Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

export class LogDecorator {
  static LogCall(): MethodDecorator {
    return (
      target: object,
      propertyKey: string,
      propertyDescriptor: PropertyDescriptor,
    ) => {
      const originalMethod = propertyDescriptor.value;

      const injectLogger = Inject(PinoLogger);
      injectLogger(target, 'logger');

      propertyDescriptor.value = async function (...args: unknown[]) {
        if (!this.logger) {
          throw new Error('CustomLogger is not available on the instance.');
        }

        this.logger.info(
          `Method call: ${target.constructor.name}.${propertyKey}`,
        );

        try {
          const result = await originalMethod.apply(this, args);

          this.logger.info(
            `Method return: ${target.constructor.name}.${propertyKey}`,
          );

          return result;
        } catch (err) {
          this.logger.info(
            `Method error: ${target.constructor.name}.${propertyKey}: ${err.message}`,
          );
          throw err;
        }
      };

      return propertyDescriptor;
    };
  }
}
