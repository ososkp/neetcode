class TextEditor {
    constructor() {
        this.leftStack = [];
        this.rightStack = [];
        this.clipboard = "";
        this.selectionStart = null;
        this.history = [{
            left: [],
            right: [],
            selectionStart: null
        }];
        this.historyPointer = 0;

        this.ops = {
            "APPEND": this.append,
            "BACKSPACE": this.backspace,
            "MOVE_CURSOR_LEFT": this.moveCursorLeft,
            "MOVE_CURSOR_RIGHT": this.moveCursorRight,
            "SELECT": this.select,
            "COPY": this.copy,
            "PASTE": this.paste,
            "UNDO": this.undo,
            "REDO": this.redo,
            "PRINT": this.print,
        }
    }

    read(operations) {
        const resultArray = [];

        for (const op of operations) {
            if (!(op[0] in this.ops)) {
                console.log(`___OPERATION ${op[0]} NOT SUPPORTED___`);
                continue;
            }
            const result = this.ops[op[0]](op[1]);

            if (["APPEND", "BACKSPACE", "MOVE_CURSOR_LEFT",
                "MOVE_CURSOR_RIGHT", "SELECT", "PASTE"].includes(op[0])) {
                if (this.historyPointer < this.history.length - 1) {
                    this.history.length = this.historyPointer + 1;
                }
                this.history.push({
                    left: [...this.leftStack],
                    right: [...this.rightStack],
                    selectionStart: this.selectionStart
                });
                this.historyPointer = this.history.length - 1;
            }

            if (result !== undefined) {
                resultArray.push(result);
            }
        }

        return resultArray;
    }

    append = (str) => {
        if (this.selectionStart === null) {
            this.leftStack.push(...str);
        } else {
            this.leftStack.splice(this.selectionStart, this.leftStack.length);
            this.leftStack.push(...str);
            this.selectionStart = null;
        }
    }

    backspace = (_) => {
        if (this.selectionStart !== null) {
            while (this.selectionStart < this.leftStack.length) {
                this.leftStack.pop();
            }
            this.selectionStart = null;
        } else {
            this.leftStack.pop();
        }
    }

    moveCursorLeft = () => {
        if (this.leftStack.length > 0) {
            const char = this.leftStack.pop();
            this.rightStack.push(char);
            this.selectionStart = null;
        }
    }

    moveCursorRight = () => {
        if (this.rightStack.length > 0) {
            const char = this.rightStack.pop();
            this.leftStack.push(char);
            this.selectionStart = null;
        }
    }

    moveCursorTo = (targetIndex) => {
        while (targetIndex < this.leftStack.length) this.moveCursorLeft();
        while (targetIndex > this.leftStack.length) this.moveCursorRight();
    }

    select = (startAndEnd) => {
        this.moveCursorTo(startAndEnd[1]);
        this.selectionStart = startAndEnd[0];
    }

    copy = () => {
        if (this.selectionStart !== null) {
            this.clipboard = this.leftStack
                .slice(this.selectionStart, this.leftStack.length)
                .join('');
        }
    }

    paste = () => {
        if (this.selectionStart !== null) {
            this.backspace();
        }
        this.append(this.clipboard);
    }

    resetState = () => {
        const history = this.history[this.historyPointer];
        this.leftStack = [...history.left];
        this.rightStack = [...history.right];
        this.selectionStart = history.selectionStart;
    }

    undo = () => {
        if (this.historyPointer > 0) {
            this.historyPointer--;
            this.resetState();
        }
    }

    redo = () => {
        if (this.historyPointer === this.history.length - 1) {
            return;
        }

        this.historyPointer++;
        this.resetState();
    }

    print = (_) => {
        return [...this.leftStack, ...[...this.rightStack].reverse()].join('');
    }
}

const ed1 = new TextEditor();
const ed2 = new TextEditor();
const ed3 = new TextEditor();

const queries1 = [
    ["BACKSPACE"],
    ["APPEND", "Hello"],
    ["PRINT"],
    ["APPEND", " World"],
    ["PRINT"],
    ["BACKSPACE"],
    ["BACKSPACE"],
    ["PRINT"]
]

const queries2 = [
    ["APPEND", "Hello World"],
    ["MOVE_CURSOR_LEFT"],
    ["MOVE_CURSOR_LEFT"],
    ["MOVE_CURSOR_LEFT"],
    ["MOVE_CURSOR_LEFT"],
    ["MOVE_CURSOR_LEFT"],
    ["BACKSPACE"],
    ["APPEND", ","],
    ["PRINT"]
]

const queries3 = [
    ["APPEND", "Hello World!"],
    ["SELECT", [6, 11]],        // Selects "World", moves cursor to index 11
    ["COPY"],                   // Clipboard now holds "World"
    ["MOVE_CURSOR_RIGHT"],      // Moves cursor to end (index 12), CLEARS selection
    ["APPEND", " "],            // Appends space
    ["PASTE"],                  // Pastes "World" -> "Hello World! World"
    ["SELECT", [0, 5]],         // Selects "Hello", moves cursor to index 5
    ["BACKSPACE"],              // Deletes "Hello", clears selection
    ["PRINT"]
]

// console.log(ed1.read(queries1));
// console.log(ed2.read(queries2));
console.log(ed3.read(queries3));