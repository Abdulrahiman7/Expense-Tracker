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
    const x=await axios.post(`http://13.234.19.1/changepassword?token=${token}`,{password:password})
    if(x.status === 200)
    {
       
        window.location.href="../login.html";
        alert('Changed password confirmed. Login to continue');
    }
}
catch(err)
{
    console.log(err);
}

}