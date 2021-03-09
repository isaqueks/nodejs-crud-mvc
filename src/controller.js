class Controller {

    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    HandleRequest(req, res) {
        
        if (req.method.toLowerCase() == 'post') {
            this.Post(req, res);
        }
        else if (req.method.toLowerCase() == 'get') {
            this.Get(req, res);
        }
        else {
            throw new Error('Could not handle ' + req.method);
        }
    }

    RespondWith(req, res, data) {

        res.status(data.status || 200);

        if (data.cookies) {
            let cookieNames = Object.keys(data.cookies);
            for (let cookieName of cookieNames) {
                let cookie = data.cookies[cookieName];
                res.cookie(cookieName, cookie, {
                    maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
                })
            }
        }

        if (data.headers) {
            let headerNames = Object.keys(data.headers);
            for (let headerName of headerNames) {
                let header = data.headers[headerName];

                res.set(headerName, header);
            }
        }

        if (!data.headers.location && this.view) // Redirect
            res.render(this.view, data.data || {});
        else
            res.end();
    }

    async Get(req, res) {
        let data = await this.model.Get(req);
        this.RespondWith(req, res, data);
    }

    async Post(req, res) {
        let data = await this.model.Post(req);
        this.RespondWith(req, res, data);
    }

}

module.exports = Controller;