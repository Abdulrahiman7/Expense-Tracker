const form=document.getElementById('form');

form.addEventListener('submit',resetPassword);

async function resetPassword(e)
{
    e.preventDefault();
    try
    {
        const email=document.getElementById('email').value;
        const x=axios.post('http://localhost:4000/forgotpassword',{email})

    }
    catch(err){
        console.log(err);
    }
}