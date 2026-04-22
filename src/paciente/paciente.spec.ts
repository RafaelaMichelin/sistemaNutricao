import { Paciente } from './paciente';

describe('Paciente', () => {
  it('should be defined', () => {
    expect(new Paciente()).toBeDefined();
  });
});
