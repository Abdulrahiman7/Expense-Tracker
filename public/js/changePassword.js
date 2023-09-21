const newPassword=document.getElementById('passwordForm');
newPassword.addEventListener('submit',changePassword);

async function changePassword(e)
{
    e.preventDefault();
    try{
    const url=window.location;
    const urlParams=new URLSearchParams(url.search);
    const token=urlParams.get('token');
    console.log(token);
    const password=document.getElementById('password').value;
    const x=await axios.post(`http://localhost:4000/changepassword?token=${token}`,{password:password})
    if(x.status === 200)
    {
       
        window.location.href="http://127.0.0.1:5500/views/login.html";
        alert('Changed password confirmed. Login to continue');
    }
}
catch(err)
{
    console.log(err);
}

}