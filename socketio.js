ಠᴥಠ = {
  $cell: true, _socket: null, style: "position: relative; font-size: 30px; font-family: Helvetica, arial; font-weight: bold; padding: 20px; padding-bottom: 100px; padding-top: 60px;",
  _add: function(m){ this.querySelector(".container")._add(m) },
  _utterance: null,
  $components: [{
    $type: "script", src: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.2/socket.io.js",
    onload: function(){
      this._socket = io()
      this._socket.on('message', function (data) { this._add(data.message) }.bind(this))
      this._utterance = new SpeechSynthesisUtterance()
    }
  }, {
    $type: "a", target: "_blank", href: "/_src", $text: "Welcome to the HTML-Less Chatroom (view source)", style: "position: fixed; top:0; left:0; border-radius: 4px; font-size: 12px; padding: 10px; margin: 10px; text-decoration: none; background: rgba(0,0,0,0.8); color: white;"
  }, {
    class: "container", _messages: [],
    _add: function(m){
      this._messages.push(m)
      this._utterance.text = m;
    },
    _message: function(m){ return { class: "row", $text: m } },
    $update: function(){
      this.$components = this._messages.map(this._message)
      window.scrollTo(0,document.body.scrollHeight)
      speechSynthesis.speak(this._utterance)
    }
  }, {
    style: "position: fixed; bottom:0; left:0; right: 0; padding: 10px; background: whitesmoke;",
    $components: [{
      $type: "input", placeholder: "Type something", style: "outline: none; width: 100%; padding: 10px; font-size: 20px;", autofocus: true, onkeyup: function(e){
        if(e.keyCode === 13) {
          this._socket.emit('message', this.value)
          this._add(this.value)
          this.value = ""
        }
      }
    }]
  }]
}
