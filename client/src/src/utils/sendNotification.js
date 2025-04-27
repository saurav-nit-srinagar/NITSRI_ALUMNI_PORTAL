const sendNotification = async (uid, title, description) => {
    try {
        await fetch(`http://localhost:5173/sendNotification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, title, description }),
        });
    } catch (error) {
        console.log(error);
    }
}

export default sendNotification;