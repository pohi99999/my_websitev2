import { test, expect } from '@playwright/test';
import sinon from 'sinon';
import { trackEvent, trackCtaClick, trackFormSubmit, analyticsAdapter, ANALYTICS_EVENTS, CTA_LOCATIONS, FORMS, FORM_STATUSES } from '../app/lib/analytics';

test.describe('Analytics Functions', () => {
  let trackStub: sinon.SinonStub;

  test.beforeEach(() => {
    trackStub = sinon.stub(analyticsAdapter, 'track');
  });

  test.afterEach(() => {
    trackStub.restore();
  });

  test('trackEvent calls analyticsAdapter.track', () => {
    trackEvent('test_event', { prop: 'value' });
    expect(trackStub.calledOnce).toBeTruthy();
    expect(trackStub.firstCall.args).toEqual(['test_event', { prop: 'value' }]);
  });

  test('trackEvent catches exceptions silently', () => {
    trackStub.throws(new Error('Analytics error'));

    // Should not throw
    expect(() => {
      trackEvent('failing_event');
    }).not.toThrow();
  });

  test('trackCtaClick maps to trackEvent with correct event name', () => {
    trackCtaClick({
      location: CTA_LOCATIONS.HeroPrimary,
      language: 'hu',
    });

    expect(trackStub.calledOnce).toBeTruthy();
    expect(trackStub.firstCall.args[0]).toBe(ANALYTICS_EVENTS.CtaClick);
    expect(trackStub.firstCall.args[1]).toEqual({
      location: CTA_LOCATIONS.HeroPrimary,
      language: 'hu',
    });
  });

  test('trackFormSubmit maps to trackEvent with correct event name', () => {
    trackFormSubmit({
      form: FORMS.ContactMain,
      status: FORM_STATUSES.Success,
      language: 'en',
    });

    expect(trackStub.calledOnce).toBeTruthy();
    expect(trackStub.firstCall.args[0]).toBe(ANALYTICS_EVENTS.FormSubmit);
    expect(trackStub.firstCall.args[1]).toEqual({
      form: FORMS.ContactMain,
      status: FORM_STATUSES.Success,
      language: 'en',
    });
  });
});
