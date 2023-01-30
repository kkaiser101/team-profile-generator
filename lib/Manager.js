const Employee = require("./Employee");

class Manager extends Employee {
    constructor(data) {
        super(data);
        this.officeNumber = data.officeNumber;
    }
    getOfficenumber() {
        return this.officeNumber;
    }
}

module.exports = Manager