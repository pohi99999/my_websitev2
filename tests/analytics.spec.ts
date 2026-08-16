import { test, expect } from '@playwright/test';
import { trackEvent, trackCtaClick, trackFormSubmit, CTA_LOCATIONS, FORMS, FORM_STATUSES } from '../app/lib/analytics';

// Verify analytics functions execute safely without throwing errors
test.describe('Analytics Functions', () => {
  test('trackEvent executes without error', () => {
    expect(() => {
      trackEvent('test_event', { prop: 'value' });
    }).not.toThrow();
  });

  test('trackCtaClick executes without error', () => {
    expect(() => {
      trackCtaClick({
        location: CTA_LOCATIONS.HeroPrimary,
        language: 'hu',
      });
    }).not.toThrow();
  });

  test('trackFormSubmit executes without error', () => {
    expect(() => {
      trackFormSubmit({
        form: FORMS.ContactMain,
        status: FORM_STATUSES.Success,
        language: 'en',
      });
    }).not.toThrow();
  });
});
