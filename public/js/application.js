document.forms[0].addEventListener('submit', async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const login = document.getElementById('username-input').value;
  const password = document.getElementById('password-input').value;
  const response = await fetch('/moderator/login', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify({
      login: login,
      password: password
    })
  });
  const result= await response.json()

  if(result.admin === true)
  {window.location='http://localhost:3000/moderator/admin'};
  if (result.admin === false){
    window.location='http://localhost:3000/moderator'};
  if(result.status === false) {
    alert("Неправильный Логин")};
});