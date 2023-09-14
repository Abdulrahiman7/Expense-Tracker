



const form=document.getElementById('form');
const to=localStorage.getItem('token')
    const headers={
        'Authorization':to
    }

form.addEventListener('submit', createExpense);

async function createExpense(e)
{
    e.preventDefault();
    const amt=document.getElementById('amount').value;
    const des=document.getElementById('description').value;
    const cat=document.getElementById('category').value;
    const newExpense={
        'amount':amt,
        'description':des,
        'category':cat
    }
    try{
        
       
    const user=await axios.post('http://localhost:4000/expense',newExpense,{headers});
    if(user.status===200)
    {
        console.log('good');
        document.getElementById('amount').value='';
        document.getElementById('description').value='';
        document.getElementById('category').value='';
    }
    }
    catch(err){
        console.log(err)
    }
}
const ul=document.createElement('ul');


function display(id, amt, des, cat)
{
    const li=document.createElement('li');
    li.setAttribute('id',id);
    const text=document.createTextNode('amount='+amt+', description='+des+', category:'+cat);
    const del=document.createElement('button');
    del.textContent= 'delete';
    li.appendChild(text);
    li.appendChild(del);
    ul.appendChild(li);

    del.addEventListener('click',deleteExpense);
}

async function deleteExpense(e)
{
    e.preventDefault();
    const id=this.parentElement.id;
  
    try{
        const x=await axios.delete(`http://localhost:4000/expense/${id}`,{headers})
        if(x.status===200)
        {
            console.log('deleted')
        }
    }
    catch(err){
        console.log(err);
    }
}

document.getElementById('buy').onclick= async function(e){
    e.preventDefault();
    try{
        const x=await axios.get('http://localhost:4000/order/buypremium',{headers})
        console.log(x.Razorpay);
        var options={
            'key': x.data.key_id,
            'order_id':x.data.order_id,
            'handler': 
            async function(x){
                await axios.post('http://localhost:4000/order/buystatus',{
                    order_id:options.order_id,
                    payment_id:x.razorpay_payment_id,
                }, {headers:headers})
                alert('you are now a premium number');
            }
            }
            const rzp1=new Razorpay(options);
            rzp1.open();
            e.preventDefault();

            rzp1.on('payment.failed', function(er){
                alert('something went wrong with payment');
            })
            location.reload();
    }
    catch(err){
        console.log('something fishy');
    }
}
let leaderboardVisible=false;

async function showLeaderboard(e)
{
    e.preventDefault();
    const ul=document.createElement('ul');
    const premiumSpace=document.getElementById('leaderboard-list');
    if(leaderboardVisible==true)
    {
        document.getElementById('leaderboard-list').innerHTML='';
        
        leaderboardVisible=false;
        return;
    }else{
    premiumSpace.style.display='block';
    
    try{
        const x=await axios.get('http://localhost:4000/premium/leaderboard',{headers})
       
       
        for(let i=0;i<x.data.arr.length;i++)
        {
            const li=document.createElement('li');
            const text=document.createTextNode(i+1+' =>'+x.data.arr[i].name+' Total Expense: '+x.data.arr[i].total);
            li.appendChild(text);
            ul.appendChild(li);
            
        }
        premiumSpace.appendChild(ul);
        leaderboardVisible=true;
        
    }
    catch(err){
        console.log(err);
    }
}
}

function isPremiumUser()
{
    const premiumSpace=document.getElementById('buydiv');
        premiumSpace.removeChild(document.getElementById('buy'));
        const text=document.createTextNode('You are a Premium User');
        const button=document.createElement('button');
        button.setAttribute('id','leaderboard');
        button.textContent='Leaderboard';
        premiumSpace.appendChild(text);
        premiumSpace.appendChild(button);
        button.addEventListener('click',showLeaderboard);

}


document.addEventListener('DOMContentLoaded',getExpense);

async function getExpense()
{

    try{
        const y=await axios.get('http://localhost:4000/expense',{headers});
        if(y.status=== 200)
        {
            
            console.log(y.data.prime);
            const z=y.data.exp;
            if(y.data.prime===true)
            {
                isPremiumUser();
            }
            
            
            for(let i=0;i<z.length;i++)
            {
                display(z[i].id, z[i].amount, z[i].description, z[i].category);
            }
        }
    }
    catch(err){
        console.log(err)
    }
}

const list=document.getElementById('expense-list');
list.appendChild(ul);