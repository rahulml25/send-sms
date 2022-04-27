const
numberInput = document.getElementById('number'),
messageInput = document.getElementById('message'),
myForm = document.getElementById('myForm'),
response = document.getElementById('response');

function setResponse(text){
  response.innerHTML = text;
}

myForm.onsubmit = (e) => {
  e.preventDefault();
  const
  number = numberInput.value.replace(/\D/g, ''),
  message = messageInput.value;

  fetch('/', {
  	method: 'POST',
  	headers: {
  	  'Content-Type': 'application/json'
  	},
  	body: JSON.stringify({number, message}),
  })
  .then(res=>res.json())
  .then(data=>setResponse(data?.message[0]))
  .catch(err=>setResponse(`error: ${err}`));
}

