YUI.add('StatsModelYQL', function (Y, NAME) {

    Y.mojito.models[NAME] = {

        init: function (config) {
            this.config = config;
        },

        getData: function (params, yqlTable, id, repo, callback) {
            Y.log(this.config);
            var itemLimit = "10",
                query = "use '{table}' as github.events; select json.type, json.actor, json.payload from github.events where id='{id}' and repo='{repo}' limit {limit}",
                queryParams = {
                    table: yqlTable,
                    limit: itemLimit,
                    id: id,
                    repo: repo
                },
                cookedQuery = Y.Lang.sub(query, queryParams);
             Y.YQL(cookedQuery, Y.bind(this.onDataReturn, this, callback));
        },
        onDataReturn: function (cb, result) {
            Y.log("onDataReturn called");
            if (result.error === undefined) {

                Y.log("github result:");
                Y.log(result);
                var results = {};
                if (result && result.query && result.query.results && result.query.results.json) {
                    results = result.query.results.json;
                }
                cb(results);
            } else {
                cb(result.error);
            }
        }
    };
}, '0.0.1', {requires: ['yql', 'substitute']});
