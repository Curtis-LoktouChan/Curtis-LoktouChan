var a = [2,3,4,6,1,8,9,4,5];
var temp;
for (var j=0;j<(a.length-1);j++)
{
    for(var i=0;i<(a.length-j-1);i++)
    {
        if(a[i]>a[i+1])
        {
            temp=a[i];
            a[i]=a[i+1];
            a[i+1]=temp;
        }
    }
}
for(var k=0;k<a.length;k++)
{
    console.log(a)
    document.getElementById("clt_demo").innerHTML=a;
}