import * as amplitude from '@amplitude/analytics-browser';

export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const paramsObject = {};
  for (const [key, value] of params.entries()) {
    paramsObject[key] = value;
  }
  return paramsObject;
}

export function trackEventWithUrlParams(eventName) {
  const urlParams = getUrlParams();

  amplitude.logEvent(eventName, {event_properties: urlParams})
}
