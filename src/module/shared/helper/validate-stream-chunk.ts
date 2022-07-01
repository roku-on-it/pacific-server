import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validateStreamChunk = async (
  cls: new () => any,
  chunk: any,
): Promise<string[]> => {
  const payload = plainToInstance(cls, chunk);
  return validate(payload, {
    validationError: { value: false, target: false },
  }).then((validationError) => {
    return validationError.map((ve) => Object.values(ve.constraints)).flat();
  });
};
