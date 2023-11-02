const form=document.getElementById('form');

form.addEventListener('submit', loginUser);

async function loginUser(e)
{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const newUser={
        'email':email,
        'password':password
    }
    try{
    const user=await axios.post('http://13.233.35.252/login',newUser);
    if(user.status===200)
    {
        localStorage.setItem('token', user.data.token)
        window.location.href='../expense.html';
        document.getElementById('email').value='';
        document.getElementById('password').value='';
    }
    }
    catch(err){
        if(err.response.status === 404)
        {
          
            alert('email not found');
        }
        if(err.response.status === 403)
        {
            alert('incorrect password')
        }
        console.log(err)
    }
}