function redact(data, toRedact) {
    if (data === null || typeof data !== 'object') {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(item => redact(item, toRedact));
    }

    const redactedObject = {};

    for (const key in data) {
        if (toRedact.has(key)) {
            redactedObject[key] = redactByType(data[key]);
        } else {
            redactedObject[key] = redact(data[key], toRedact);
        }
    }

    return redactedObject
}

function redactByType(item) {
    let result;
    switch (typeof item) {
        case 'boolean':
            result = '*';
            break;
        case 'string':
            result = item.replace(/./g, '*');
            break;
        case 'number':
            result = item.toString().replace(/./g, '*');
            break;
    }
    return result;
}

const rawLogData = {
    "eventId": 101,
    "timestamp": "2023-10-27T10:00:00Z",
    "user": {
        "username": "alice_smith",
        "password": "superSecretPassword123",
        "email": "alice@example.com",
        "paymentMethods": [
            { "type": "credit_card", "cardNumber": "4111-1111-1111-1111" },
            { "type": "paypal", "email": "alice.personal@example.com" }
        ]
    }
};

const sensitiveKeys = new Set(['password', 'cardNumber']);



const safeLogData = redact(rawLogData, sensitiveKeys);

console.log(JSON.stringify(safeLogData, null, 2));