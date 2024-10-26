import { TestBed } from '@angular/core/testing';

import { NotasCreditoService } from './notas-credito.service';

describe('NotasCreditoService', () => {
  let service: NotasCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotasCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
