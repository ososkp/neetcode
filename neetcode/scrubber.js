class Solution {
    scrubObject(input, toScrub) {
        if (Array.isArray(input)) {
            return input.map(el => this.scrubObject(el, toScrub))
        }

        if (typeof input === 'object' && input !== null) {
            const scrubbed = {}

            for (let key in input) {
                if (toScrub.has(key)) {
                    scrubbed[key] = (typeof input === 'boolean')
                        ? '*'
                        : input[key].toString().replace(/./g, '*')
                } else {
                    scrubbed[key] = this.scrubObject(input[key], toScrub);
                }
            }
            return scrubbed
        }

        return input;
    }
}

const sol = new Solution();

const input = {
    "user": {
        "id": 101,
        "email": "dev@example.com",
        "profile": {
            "username": "coder123",
            "password": "super-secret-password-123"
        }
    },
    "tags": ["admin", "beta-tester"],
    "security_logs": [
        {
            "id": "log_01",
            "action": "login",
            "secret_key": "abc-123-xyz"
        },
        {
            "id": "log_02",
            "action": "logout",
            "metadata": {
                "ip": "192.168.1.1",
                "secret_key": "deep-nested-key"
            }
        }
    ],
    "misc_info": [1, "hello", { "secret_key": "hidden_in_array" }]
}

const expected = {
    "user": {
        "id": 101,
        "email": "***************", // 15 chars
        "profile": {
            "username": "coder123",
            "password": "*************************" // 25 chars
        }
    },
    "tags": ["admin", "beta-tester"],
    "security_logs": [
        {
            "id": "log_01",
            "action": "login",
            "secret_key": "***********" // 11 chars
        },
        {
            "id": "log_02",
            "action": "logout",
            "metadata": {
                "ip": "192.168.1.1",
                "secret_key": "***************" // 15 chars
            }
        }
    ],
    "misc_info": [
        1,
        "hello",
        {
            "secret_key": "***************" // 15 chars
        }
    ]
}

const fieldsToScrub = new Set(["email", "password", "secret_key"]);
const result = sol.scrubObject(input, fieldsToScrub);

console.log(JSON.stringify(result, null, 2))
console.log(JSON.stringify(expected, null, 2));
console.log(JSON.stringify(result) == JSON.stringify(expected));
