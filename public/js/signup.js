const form=document.getElementById('form');

form.addEventListener('submit', createUser);

async function createUser(e)
{
    e.preventDefault();
    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const newUser={
        'name':name,
        'email':email,
        'password':password
    }
    try{
        console.log('ent')
    const user=await axios.post('http://localhost:4000/signup',newUser);
    if(user.status===200)
    {
        console.log('good');
        document.getElementById('name').value='';
        document.getElementById('email').value='';
        document.getElementById('password').value='';
    }
    }
    catch(err){
        console.log(err)
    }
}