import { test, expect } from '@playwright/test';
import { getPortfolioProjectMeta } from '../app/portfolio/projects.meta';

test.describe('getPortfolioProjectMeta', () => {
  test('returns undefined for unknown id', () => {
    const result = getPortfolioProjectMeta('unknown-id');
    expect(result).toBeUndefined();
  });

  test('resolves portfolio project meta for numeric string id', () => {
    const result = getPortfolioProjectMeta('1');

    expect(result).toBeDefined();
    expect(result?.id).toBe('1');
    expect(result?.title).toBe('E-commerce AI Személyesítési Platform');
    expect(result?.emoji).toBe('🛍️');
    expect(result?.industry).toBe('E-commerce');
    expect(result?.description).toContain('Képi felismerésre és gépi tanulásra alapuló');
  });

  test('resolves portfolio project meta for slug id', () => {
    const result = getPortfolioProjectMeta('web-robotpilota');

    expect(result).toBeDefined();
    expect(result?.id).toBe('web-robotpilota');
    expect(result?.title).toBe('Web Robotpilóta');
    expect(result?.emoji).toBe('🤖');
    expect(result?.industry).toBe('Automatizálás');
  });
});
