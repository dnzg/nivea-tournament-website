export const GA_TRACKING_ID = ""; // GOOGLE ANALYTICS TRACKING ID

// log the pageview with their URL
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag("event", action, params);
};
