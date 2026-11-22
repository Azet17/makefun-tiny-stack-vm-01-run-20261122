import{readFileSync as R,writeFileSync as W,mkdirSync as M}from"node:fs";
const O=65536;
function run(p,g){
 const n=p.length,D=new Int32Array(256);let s=0;
 const C=new Int32Array(64);let c=0;
 const A=new Int32Array(256),o=Buffer.alloc(O);let l=0,q=0,t=0,k=0;
 const end=e=>({o:o.subarray(0,l),e});
 for(;;){
  if(t===1e6)return end(10);
  if(k<0||k>=n)return end(9);
  const b=p[k];let m=0,u=0,v=0;
  if(b<8){m=b==1?1:b==2?4:0;u=[0,0,0,1,1,2,2,3][b];v=[0,1,1,0,2,2,3,3][b]}
  else if(b>=16&&b<=34){u=b==23||b==27?1:2;v=1}
  else if(b>=48&&b<=52){m=b<52?2:0;u=b==49||b==50?1:0}
  else if(b==64){u=1;v=1}
  else if(b==65){u=2}
  else if(b>=80&&b<=83){u=b==82?0:1;v=b==82?1:0}
  else return end(5);
  if(k+m>=n)return end(9);
  t++;
  const x=k+1+m;
  if(s<u)return end(2);
  if(s-u+v>256)return end(3);
  k=x;
  switch(b){
   case 0:return end(0);
   case 1:D[s++]=p[x-1]<<24>>24;break;
   case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:{const a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break}
   case 6:D[s]=D[s-2];s++;break;
   case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break}
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 48:k=x+((p[x-2]|p[x-1]<<8)<<16>>16);break;
   case 49:case 50:{const a=D[--s];if((b==49)==(a==0))k=x+((p[x-2]|p[x-1]<<8)<<16>>16);break}
   case 51:if(c==64)return end(7);C[c++]=x;k=p[x-2]|p[x-1]<<8;break;
   case 52:if(!c)return end(8);k=C[--c];break;
   case 64:{const a=D[s-1];if(a<0||a>255)return end(6);D[s-1]=A[a];break}
   case 65:{const a=D[s-1];if(a<0||a>255)return end(6);s-=2;A[a]=D[s];break}
   case 80:{const y=String(D[s-1]);if(l+y.length>O)return end(11);s--;l+=o.write(y,l);break}
   case 81:if(l+1>O)return end(11);o[l++]=D[--s]&255;break;
   case 82:D[s++]=q<g.length?g[q++]:-1;break;
   case 83:return end(D[--s]&255);
   default:{
    const y=D[s-1],a=D[s-2];let r;
    switch(b){
     case 16:r=a+y|0;break;
     case 17:r=a-y|0;break;
     case 18:r=Math.imul(a,y);break;
     case 19:if(!y)return end(4);r=a===-2147483648&&y===-1?a:(a/y)|0;break;
     case 20:if(!y)return end(4);r=y===-1?0:a%y|0;break;
     case 21:if(!y)return end(4);r=Math.floor((a>>>0)/(y>>>0))|0;break;
     case 22:if(!y)return end(4);r=(a>>>0)%(y>>>0)|0;break;
     case 24:r=a&y;break;
     case 25:r=a|y;break;
     case 26:r=a^y;break;
     case 28:r=a<<(y&31);break;
     case 29:r=a>>(y&31);break;
     case 30:r=(a>>>(y&31))|0;break;
     case 32:r=a===y?1:0;break;
     case 33:r=a<y?1:0;break;
     case 34:r=(a>>>0)<(y>>>0)?1:0;break;
    }
    s-=2;D[s++]=r;break;
   }
  }
 }
}
for(let n=1;n<=40;n++){
 const d="i"+String(n).padStart(3,"0");
 let p,g;
 try{p=R("/input/"+d+"/program.bin")}catch{p=Buffer.alloc(0)}
 try{g=R("/input/"+d+"/input.bin")}catch{g=Buffer.alloc(0)}
 const{o,e}=run(p,g);
 M("/output/"+d,{recursive:true});
 W("/output/"+d+"/stdout.bin",o);
 W("/output/"+d+"/exit.txt",e+"\n");
}
