// Notifications

const NOTIFICATION_CLASSNAME = 'notification';
const notificationsContainer = document.querySelector(
    '.notificationsContainer'
);

/**
 *
 * @param {string} message
 * @param {number} timeout
 */
const createNotification = (message, timeout = 2500) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.classList.add(NOTIFICATION_CLASSNAME);
    setTimeout(() => {
        console.log('removing notification');
        notification.remove();
    }, timeout);

    notificationsContainer.appendChild(notification);
};

export { createNotification };
