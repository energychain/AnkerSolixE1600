module.exports = function(RED) {
    function Reader(config) {
        const SolixE1600 = require('./SolixE1600.js');
        RED.nodes.createNode(this,config);

        const node = this;

        const mysolix = new SolixE1600(config);
       
        node.on('input', async function(msg) {
            if(typeof msg.payload == 'object') {
                mysolix.setSchedule(msg.payload);
            }
            const sitemap = await mysolix.getSitehomepage();
            const schedule = await mysolix.getSchedule();
            node.send([{payload:sitemap},{payload:schedule}]);
        });
    }
    RED.nodes.registerType("E1600",Reader);
}
