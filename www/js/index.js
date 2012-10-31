var app = {
initialize: function() {
    this.bind();
},
bind: function() {
    document.addEventListener('deviceready', this.deviceready, false);
},
deviceready: function() {
    var apiKey = "20749592"; // Replace with your apiKey.
    var sessionId = "1_MX4yMDc0OTU5Mn5-TW9uIE9jdCAwOCAxMTowOTo0NiBQRFQgMjAxMn4wLjc3MTkzMDE2fg"; // Replace with your own session ID. Make sure it matches helloWorld.html
    var token = "T1==cGFydG5lcl9pZD0yMDc0OTU5MiZzaWc9NGY4NDhjZDhiZGEwYmE0ZGU0NDlhMTk4MDBiOWRiNzU2MmMwMDY5ZjpzZXNzaW9uX2lkPTFfTVg0eU1EYzBPVFU1TW41LVRXOXVJRTlqZENBd09DQXhNVG93T1RvME5pQlFSRlFnTWpBeE1uNHdMamMzTVRrek1ERTJmZyZjcmVhdGVfdGltZT0xMzUxNTEzMTEyJnJvbGU9bW9kZXJhdG9yJm5vbmNlPTEzNTE1MTMxMTIuNTczODEyMzQ3NjUxODUmZXhwaXJlX3RpbWU9MTM1MTk0NTExMiZjb25uZWN0aW9uX2RhdGE9aGVsbG8rd29ybGQlMjE="; // Replace with your session Token.
    // To Generate Sessions and Tokens, See http://www.tokbox.com/opentok/api/tools/generator
    
    var session = TB.initSession(sessionId);
    var publisher = TB.initPublisher( apiKey, "myPublisherDiv" ); // Replace with your API key
    
    session.addEventListener("sessionConnected", sessionConnectedHandler);
    session.addEventListener("streamCreated", streamCreatedHandler);
    session.connect(apiKey, token);
    
    function sessionConnectedHandler(event) {
        subscribeToStreams(event.streams);
        session.publish( publisher );
    }
    
    function streamCreatedHandler(event) {
        subscribeToStreams(event.streams);
    }
    
    function subscribeToStreams(streams) {
        for (i = 0; i < streams.length; i++) {
            var stream = streams[i];
            if (stream.connection.connectionId != session.connection.connectionId) {
                var div = document.createElement('div');
                div.setAttribute('id', 'stream' + stream.streamId);
                document.body.appendChild(div);
                session.subscribe(stream, div.id);
            }
        }
    }
},
report: function(id) {
    console.log("report:" + id);
    // hide the .pending <p> and show the .complete <p>
    document.querySelector('#' + id + ' .pending').className += ' hide';
    var completeElem = document.querySelector('#' + id + ' .complete');
    completeElem.className = completeElem.className.split('hide').join('');
}
};


