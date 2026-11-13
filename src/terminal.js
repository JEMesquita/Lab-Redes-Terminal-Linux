const initialFs=()=>({
"/":{type:"dir",mode:"755"},"/home":{type:"dir",mode:"755"},"/home/aluno":{type:"dir",mode:"755"},
"/home/aluno/Documentos":{type:"dir",mode:"755"},"/home/aluno/Downloads":{type:"dir",mode:"755"},
"/home/aluno/boas-vindas.txt":{type:"file",content:"Bem-vindo ao Laboratório Linux da EEEP Júlia Giffoni.\nAprenda comandos Linux com segurança.",mode:"644"},
"/home/aluno/relatorio.txt":{type:"file",content:"Relatório de prática: sistemas operacionais livres.",mode:"644"},
"/home/aluno/script.sh":{type:"file",content:"#!/bin/bash\necho Laboratório Linux",mode:"644"},
"/home/aluno/Documentos/aula.txt":{type:"file",content:"Anotações da aula de Linux.",mode:"644"}});
export function createState(){return{cwd:"/home/aluno",user:"aluno",fs:initialFs(),users:["aluno","root"],packages:["bash","coreutils"],history:[],updated:false};}
const norm=(p,c)=>{if(!p||p==="~")return"/home/aluno";let s=p.startsWith("/")?p:`${c}/${p}`,a=[];for(let x of s.split("/")){if(!x||x===".")continue;if(x==="..")a.pop();else a.push(x);}return"/"+a.join("/")};
const parent=p=>p.slice(0,p.lastIndexOf("/"))||"/",base=p=>p.split("/").pop(),children=(s,p)=>Object.keys(s.fs).filter(k=>parent(k)===p);
export function execute(input,s){
const raw=input.trim();if(!raw)return"";s.history.push(raw);const a=(raw.match(/"[^"]*"|'[^']*'|[^\s]+/g)||[]).map(x=>x.replace(/^["']|["']$/g,"")),cmd=a[0],bad=x=>`bash: ${x}`,path=x=>norm(x,s.cwd);
switch(cmd){
case"help":return"whoami pwd date ls cd mkdir touch cat echo cp mv rm rmdir grep find chmod chown man history ip ping hostname arp ifconfig netstat traceroute ps top df tar gzip apt dpkg sudo reboot poweroff";
case"clear":return"\u0000CLEAR";case"whoami":return s.user;case"pwd":return s.cwd;case"date":return"Thu Nov 12 2026 21:00:00 -03";case"hostname":return"lab-ubuntu";case"id":return"uid=1000(aluno) gid=1000(aluno) groups=1000(aluno),27(sudo)";
case"ls":{let p=path(a[1]||".");if(!s.fs[p]||s.fs[p].type!=="dir")return bad("diretório não encontrado");return children(s,p).map(k=>base(k)+(s.fs[k].type==="dir"?"/":"")).sort().join("  ")||"(vazio)";}
case"cd":{let p=path(a[1]||"~");if(!s.fs[p]||s.fs[p].type!=="dir")return bad("diretório não encontrado");s.cwd=p;return"";}
case"mkdir":{let p=path(a[1]);if(!a[1])return bad("uso: mkdir NOME");if(s.fs[p])return bad("já existe");if(!s.fs[parent(p)])return bad("diretório pai não existe");s.fs[p]={type:"dir",mode:"755"};return"";}
case"touch":{let p=path(a[1]);if(!a[1])return bad("uso: touch ARQUIVO");s.fs[p]??={type:"file",content:"",mode:"644"};return"";}
case"cat":{let p=path(a[1]);if(p==="/etc/passwd")return s.users.map((u,i)=>`${u}:x:${i?1000:0}:${i?1000:0}:${u}:/home/${u}:/bin/bash`).join("\n");if(!s.fs[p]||s.fs[p].type!=="file")return bad("arquivo não encontrado");return s.fs[p].content||"";}
case"echo":{let i=a.indexOf(">");if(i>=0){s.fs[path(a[i+1])]={type:"file",content:a.slice(1,i).join(" ")+"\n",mode:"644"};return"";}return a.slice(1).join(" ");}
case"cp":case"mv":{let x=path(a[1]),y=path(a[2]);if(!s.fs[x])return bad("origem não encontrada");s.fs[y]={...s.fs[x]};if(cmd==="mv")delete s.fs[x];return"";}
case"rm":{let p=path(a[a.length-1]);if(!s.fs[p])return bad("arquivo não encontrado");if(s.fs[p].type==="dir"&&a[1]!=="-r")return bad("é diretório; use rm -r");Object.keys(s.fs).filter(k=>k===p||k.startsWith(p+"/")).forEach(k=>delete s.fs[k]);return"";}
case"rmdir":{let p=path(a[1]);if(children(s,p).length)return bad("diretório não vazio");delete s.fs[p];return"";}
case"grep":{let p=path(a[2]);if(!s.fs[p])return bad("arquivo não encontrado");return(s.fs[p].content||"").split("\n").filter(x=>x.includes(a[1])).join("\n");}
case"find":{let root=path(a[1]&&a[1]!=="."?a[1]:"."),i=a.indexOf("-name"),n=i>=0?a[i+1]:"";return Object.keys(s.fs).filter(k=>(k===root||k.startsWith(root+"/"))&&(!n||base(k)===n)).join("\n");}
case"chmod":{let p=path(a[2]);if(!s.fs[p])return bad("arquivo não encontrado");s.fs[p].mode=a[1]==="u+x"?"744":a[1];return"";}
case"chown":{let p=path(a[2]);if(!s.fs[p])return bad("arquivo não encontrado");s.fs[p].owner=a[1];return"";}
case"man":return `Manual simulado de ${a[1]||"comandos"}\nConsulte help para comandos disponíveis.`;
case"history":return s.history.map((x,i)=>`${i+1}  ${x}`).join("\n");
case"ip":return a[1]==="route"?"default via 192.168.10.1 dev enp0s3\n192.168.10.0/24 dev enp0s3":"1: lo: <LOOPBACK,UP> inet 127.0.0.1/8\n2: enp0s3: <BROADCAST,MULTICAST,UP> inet 192.168.10.20/24";
case"ifconfig":return"enp0s3: inet 192.168.10.20 netmask 255.255.255.0\nlo: inet 127.0.0.1";case"arp":return"Address HWaddress\n192.168.10.1 08:00:27:aa:bb:01";
case"ping":return `PING ${a[1]||"destino"}: 4 packets transmitted, 4 received, 0% packet loss`;
case"traceroute":return `traceroute to ${a[1]||"destino"}\n1 192.168.10.1 1.2 ms\n2 203.0.113.1 8.5 ms\n3 destino 12.0 ms`;
case"netstat":return"Active Internet connections\nProto Recv-Q Send-Q Local Address Foreign Address State\ntcp 0 0 0.0.0.0:22 0.0.0.0:* LISTEN";
case"ps":return"PID TTY TIME CMD\n1 ? 00:00:01 systemd\n812 pts/0 00:00:00 bash\n920 pts/0 00:00:00 ps";
case"top":return"top - 21:00:00 up 1 day\n%Cpu(s): 4.0 us, 2.0 sy\nPID USER PR NI VIRT RES S %CPU COMMAND\n812 aluno 20 0 5000 2000 S 1.0 bash";
case"df":return"Filesystem Size Used Avail Use% Mounted on\n/dev/sda1 25G 8G 17G 32% /";
case"tar":{let out=a.find(x=>x.endsWith(".tar.gz"));if(!out)return bad("arquivo de saída não informado");s.fs[path(out)]={type:"file",content:"Pacote simulado: "+a[a.length-1],mode:"644"};return"a arquivo adicionado ao pacote (simulação)";}
case"gzip":return"Arquivo compactado (simulação).";
case"apt":if(a[1]==="update"){s.updated=true;return"Lista de pacotes atualizada com sucesso — operação simulada concluída.";}if(a[1]==="install"){if(!s.updated)return"Execute sudo apt update antes da instalação.";let p=a[a.length-1];if(!s.packages.includes(p))s.packages.push(p);return`Instalando ${p}... concluída: ${p} instalado (simulado).`;}return bad("uso: apt update | apt install PACOTE");
case"dpkg":return a[1]==="-l"?s.packages.map(p=>`ii ${p} 1.0 pacote simulado`).join("\n"):"Operação dpkg simulada.";
case"sudo":if(a[1]==="adduser"){let u=a[2];if(!u)return bad("informe usuário");if(!s.users.includes(u))s.users.push(u);s.fs[`/home/${u}`]={type:"dir",mode:"750"};return`Usuário ${u} criado (simulação).`;}return`Privilégios administrativos simulados: ${a.slice(1).join(" ")}`;
case"reboot":case"poweroff":return"Ação registrada no laboratório virtual. O navegador não será reiniciado ou desligado.";
default:return bad(`${cmd}: comando não encontrado. Digite help.`);
}}
