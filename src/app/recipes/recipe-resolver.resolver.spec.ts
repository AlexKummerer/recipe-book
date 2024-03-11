import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { recipeResolverResolver } from './recipe-resolver.resolver';

describe('recipeResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => recipeResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
