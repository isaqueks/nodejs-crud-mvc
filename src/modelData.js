
class ModelData {

    constructor(arg) {
        this.cookies = {};
        this.headers = {};
        this.data = {};
        this.status = 200;

        if (typeof arg == 'object') {
            this.setData(arg);
        }
    }

    setData(data) {
        this.data = data;
        return this;
    }

    addData(obj) {
        this.data = {...this.data, ...obj};
        return this;
    }

    setCookie(name, value) {
        this.cookies[name] = value;
        return this;
    }

    setHeader(name, value) {
        this.headers[name] = value;
        return this;
    }

    setStatus(statusCode) {
        this.status = statusCode;
        return this;
    }

    redirect(location) {
        this.setHeader('location', location).setStatus(302);
        return this;
    }

}

module.exports = ModelData;