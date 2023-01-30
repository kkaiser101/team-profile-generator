class Employee {
    constructor(data) {
        this.title = data.title;
        this.name = data.name;
        this.id = data.id;
        this.email = data.email;
    }
    getRole() {
        return this.title;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
}

module.exports = Employee