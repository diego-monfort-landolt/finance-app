import React, { useEffect } from 'react';
import './Notification.css'; // Styling für die Benachrichtigung

interface NotificationProps {
    message: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Benachrichtigung wird nach 3 Sekunden geschlossen

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="notification">
            <p>{message}</p>
        </div>
    );
};

export default Notification;
