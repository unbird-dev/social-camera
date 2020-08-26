export const openPWA = (token, conversationId) => {
  const url = `${process.env.WEB_APP_URL}?token=${token || localStorage.getItem('gb-token')}${conversationId ? `&conversationId=${conversationId}` : ''}`;

  window.open(
    url,
    '__blank',
    `fullscreen=no,menubar=no,resizable=no,scrollbars=no,
    height=850,width=376,location=no,status=no,titlebar=no,toolbar=no`,
  );
};

export default { openPWA };
