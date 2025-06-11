// src/app/auth/auth-jwt.interceptor.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler } from '@angular/common/http'; // Importe HttpRequest e HttpHandler
import { AuthJwtInterceptor } from './auth-jwt-interceptor'; // Importe a CLASSE do interceptor
import { AuthService } from './auth'; // Importe o AuthService para mocks

describe('AuthJwtInterceptor', () => {
  let interceptor: AuthJwtInterceptor;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  // Mocks para requisições e handlers (ajustado para HttpHandler abstrato)
  let mockHttpRequest: HttpRequest<any>;
  let mockHttpHandler: jasmine.SpyObj<HttpHandler>; // <--- CORREÇÃO AQUI: Use jasmine.SpyObj para HttpHandler

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    // CORREÇÃO AQUI: Crie um spy object para HttpHandler
    mockHttpHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
    // O mockHttpHandler.handle deve retornar um observable vazio para que a cadeia funcione
    mockHttpHandler.handle.and.returnValue(new Observable()); // Importar 'Observable' do 'rxjs'

    TestBed.configureTestingModule({
      providers: [
        AuthJwtInterceptor,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    interceptor = TestBed.inject(AuthJwtInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header if a token exists', () => {
    const mockToken = 'test-jwt-token';
    authServiceSpy.getToken.and.returnValue(mockToken); // Faz o getToken retornar um token

    mockHttpRequest = new HttpRequest('GET', '/test'); // Requisição de mock

    interceptor.intercept(mockHttpRequest, mockHttpHandler).subscribe(); // Chame com os mocks

    // Verifica se o handle foi chamado e se o cabeçalho Authorization foi adicionado
    const expectedHeaders = { Authorization: `Bearer ${mockToken}` };
    expect(mockHttpHandler.handle).toHaveBeenCalledWith(
      jasmine.objectContaining({ headers: jasmine.objectContaining(expectedHeaders) })
    );
  });

  it('should not add an Authorization header if no token exists', () => {
    authServiceSpy.getToken.and.returnValue(null); // Faz o getToken retornar null

    mockHttpRequest = new HttpRequest('GET', '/test'); // Requisição de mock

    interceptor.intercept(mockHttpRequest, mockHttpHandler).subscribe(); // Chame com os mocks

    // Verifica se o handle foi chamado com a requisição ORIGINAL
    expect(mockHttpHandler.handle).toHaveBeenCalledWith(mockHttpRequest);
  });
});

// Importe Observable no topo do arquivo se ele não estiver lá
import { Observable } from 'rxjs';
