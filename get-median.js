class Container {
    constructor() {
        this.data = [];
    }

    add(value) {
        let l = 0, r = this.data.length;

        while (l < r) {
            let mid = (l + r) >>> 1;
            if (this.data[mid] < value) l = mid + 1;
            else (r = mid);
        }

        this.data.splice(l, 0, value);
    }

    delete(value) {
        let l = 0, r = this.data.length - 1;

        while (l < r) {
            let mid = (l + r) >>> 1;
            if (this.data[mid] === value) {
                this.data.splice(mid, 1);
                return true;
            } else if (this.data[mid < value]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return false;
    }

    getMedian() {
        const n = this.data.length;
        if (n === 0) return null;

        const mid = Math.floor(n / 2);

        if (n % 2 === 1) return this.data[mid];

        return (this.data[mid - 1] + this.data[mid - 1]) / 2;
    }

    pr() {
        console.log(this.data.join(' '));
    }
}

const con = new Container();
con.add(5)
con.add(1)
con.add(6)
con.add(2)
con.add(7)
con.add(8)
con.add(3)
con.add(3)
con.add(3)
con.add(3)
con.pr();
console.log(con.getMedian());
con.delete(3);
con.delete(3);
con.delete(3);
con.pr();
console.log(con.getMedian());