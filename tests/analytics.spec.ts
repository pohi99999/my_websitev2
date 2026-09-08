import { test, expect } from '@playwright/test';
import sinon from 'sinon';
import { trackEvent, trackCtaClick, trackFormSubmit, CTA_LOCATIONS, FORMS, FORM_STATUSES, analyticsAdapter, ANALYTICS_EVENTS } from '../app/lib/analytics';

test.describe('Analytics Functions', () => {
  let trackStub: sinon.SinonStub;
  let gtagStub: sinon.SinonStub;

  test.beforeEach(() => {
    trackStub = sinon.stub(analyticsAdapter, 'track');
    gtagStub = sinon.stub(analyticsAdapter, 'gtag');
  });

  test.afterEach(() => {
    sinon.restore();
  });

  test('trackEvent executes without error and calls adapters', () => {
    const props = { prop: 'value' };
    expect(() => {
      trackEvent('test_event', props);
    }).not.toThrow();

    expect(trackStub.calledOnce).toBeTruthy();
    expect(trackStub.calledWith('test_event', props)).toBeTruthy();

    expect(gtagStub.calledOnce).toBeTruthy();
    expect(gtagStub.calledWith('event', 'test_event', props)).toBeTruthy();
  });

  test('trackEvent suppresses errors from analytics adapter', () => {
    trackStub.throws(new Error('Vercel Analytics failed'));

    expect(() => {
      trackEvent('test_event');
    }).not.toThrow();

    // Should still try to call gtag even if track fails
    expect(gtagStub.calledOnce).toBeTruthy();
  });

  test('trackEvent suppresses errors from gtag adapter', () => {
    gtagStub.throws(new Error('GTAG failed'));

    expect(() => {
      trackEvent('test_event');
    }).not.toThrow();

    expect(trackStub.calledOnce).toBeTruthy();
  });

  test('trackCtaClick calls trackEvent with correct payload', () => {
    const payload = {
      location: CTA_LOCATIONS.HeroPrimary,
      language: 'hu',
    };

    expect(() => {
      trackCtaClick(payload);
    }).not.toThrow();

    expect(trackStub.calledOnce).toBeTruthy();
    expect(trackStub.calledWith(ANALYTICS_EVENTS.CtaClick, payload)).toBeTruthy();
  });

  test('trackFormSubmit calls trackEvent with correct payload', () => {
    const payload = {
      form: FORMS.ContactMain,
      status: FORM_STATUSES.Success,
      language: 'en',
    };

    expect(() => {
      trackFormSubmit(payload);
    }).not.toThrow();

    expect(trackStub.calledOnce).toBeTruthy();
    expect(trackStub.calledWith(ANALYTICS_EVENTS.FormSubmit, payload)).toBeTruthy();
  });
});
