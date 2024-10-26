import { TestBed } from '@angular/core/testing';

import { PaquetesClientesService } from './paquetes-clientes.service';

describe('PaquetesClientesService', () => {
  let service: PaquetesClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaquetesClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
