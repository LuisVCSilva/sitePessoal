function Grep (str,pattern) {
var re = new RegExp(pattern, 'g'),
ocorrencias = [];
while ((match = re.exec(str)) != null) {
    ocorrencias.push([match.index,(match[0].length+match.index-1)]);
}
saida = "";
k = 0;
for(var i=0;i<ocorrencias.length;i++)
{
   if(i==0)
   {
      if(ocorrencias[0][0]!=0)
      {
      saida += str.substring(0,ocorrencias[0][0]);
      }
   }
saida += "<a href=\"#\">"+str.substring(ocorrencias[i][0],ocorrencias[i][1]+1)+"</a>";
   if(i+1<ocorrencias.length)
   {
      if(ocorrencias[i][1]+1!=ocorrencias[i+1][0])
      {
      saida += str.substring(ocorrencias[i][1]+1,ocorrencias[i+1][0]);
      }
   }
}
saida += str.substring(ocorrencias[ocorrencias.length-1][1]+1,str.length);
imprime(false,saida);
}