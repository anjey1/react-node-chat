import React from 'react'

let TextBar = ({ onSend, style, userCache }) => {
  let textInput = React.createRef();

  let sendMessage = () => {
    onSend && onSend(textInput.current.value)
    textInput.current.value = ""
  }

  let sendMessageIfEnter = (e) => {
    if (e.keyCode === 13) {
      sendMessage()
    }
  }
  let textbarStyle = { textAlign: 'center' }
  let buttonStyle = {
    backgroundColor: '#4CAF50', /* Green */
    border: 'none',
    color: 'white',
    padding: 20 + 'px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inlineBlock',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    position: 'relative',
    top: -3 + 'px'
  }
  return (<div className='textbar' style={textbarStyle}>
    <input className='textbar-input' type='text' ref={textInput} onKeyDown={sendMessageIfEnter} style={style} />
    <button className='textbar-send' onClick={sendMessage} style={buttonStyle}>
      Send
    </button>
    <div>
      {
        userCache.map(user => {
          console.log("Key: ", user);
          return <img className="massageItem" src={user} alt="avatar" key={user + Math.floor(Math.random() * 10)} />
        })
      }
    </div>
  </div>)

}

export default TextBar