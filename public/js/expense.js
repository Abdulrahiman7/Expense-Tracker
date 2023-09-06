const form=document.getElementById('form');

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
        console.log('ent')
    const user=await axios.post('http://localhost:4000/expense',newExpense);
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
    const del=document.createElement('delete');
    del.textContent= 'delete';
    li.appendChild(text);
    li.appendChild(del);
    ul.appendChild(li);

}



document.addEventListener('DOMContentLoaded',getExpense);

async function getExpense()
{
    try{
        const x=await axios.get('http://localhost:4000/expense');
        if(x.status=== 200)
        {
            for(let i=0;i<x.data.length;i++)
            {
                display(x.data[i].id, x.data[i].amount, x.data[i].description, x.data[i].category);
            }
        }
    }
    catch(err){
        console.log(err)
    }
}

const list=document.getElementById('expense-list');
list.appendChild(ul);