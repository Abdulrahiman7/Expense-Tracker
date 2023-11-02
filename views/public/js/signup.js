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
    const user=await axios.post('http://13.233.35.252/signup',newUser);
    if(user.status===200)
    {
        console.log('good');
        document.getElementById('name').value='';
        document.getElementById('email').value='';
        document.getElementById('password').value='';
    }
    if(user.status === 208)
    {
      
        alert('email already exists');
    }
    if(user.status === 204)
    {
        alert('Please fill all fields')
    }
    }
    catch(err){
        console.log(err)
    }
}