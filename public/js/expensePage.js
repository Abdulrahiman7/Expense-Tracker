document.addEventListener('DOMContentLoaded',getContent);
const to=localStorage.getItem('token');
headers={
    'Authorization':to
}
async function getContent()
{
    try{
        const x=await axios.get('http://localhost:4000/expensePage',{headers});
        if(x.status===200)
        {
            const expenses=x.data.exp;
            if(x.data.prime === true)
            {
                
            }
        }
    }
    catch(err){
        console.log(err);
    }
}