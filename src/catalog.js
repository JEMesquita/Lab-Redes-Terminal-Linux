export const lessons = [
{id:"L01",unit:"Fundamentos",level:"Iniciante",title:"Conhecendo o terminal",goal:"Identificar usuário, diretório e ajuda.",tasks:[
{prompt:"Qual usuário está executando o terminal?",command:"whoami",check:r=>r.trim()==="aluno",hint:"Use whoami.",explain:"whoami exibe o usuário atual."},
{prompt:"Em qual diretório você está?",command:"pwd",check:r=>r.trim()==="/home/aluno",hint:"Use pwd.",explain:"pwd mostra o caminho atual."},
{prompt:"Mostre data e hora.",command:"date",check:r=>r.includes("2026"),hint:"Use date.",explain:"date apresenta data e hora."}]},
{id:"L02",unit:"Diretórios",level:"Iniciante",title:"Navegação: pwd, ls e cd",goal:"Navegar pela árvore de diretórios Linux.",tasks:[
{prompt:"Liste arquivos e pastas.",command:"ls",check:r=>r.includes("Documentos")&&r.includes("Downloads"),hint:"Digite ls.",explain:"ls lista conteúdo."},
{prompt:"Entre em Documentos.",command:"cd Documentos",check:(r,s)=>s.cwd==="/home/aluno/Documentos",hint:"cd Documentos",explain:"cd altera diretório."},
{prompt:"Volte para sua pasta pessoal.",command:"cd ..",check:(r,s)=>s.cwd==="/home/aluno",hint:"cd ..",explain:".. representa o diretório pai."}]},
{id:"L03",unit:"Arquivos",level:"Iniciante",title:"Criando arquivos e pastas",goal:"Criar estrutura com mkdir e touch.",tasks:[
{prompt:"Crie uma pasta chamada redes.",command:"mkdir redes",check:(r,s)=>s.fs["/home/aluno/redes"]?.type==="dir",hint:"mkdir redes",explain:"mkdir cria diretórios."},
{prompt:"Entre na pasta redes.",command:"cd redes",check:(r,s)=>s.cwd==="/home/aluno/redes",hint:"cd redes",explain:"cd navega até a pasta."},
{prompt:"Crie anotacoes.txt.",command:"touch anotacoes.txt",check:(r,s)=>Boolean(s.fs["/home/aluno/redes/anotacoes.txt"]),hint:"touch anotacoes.txt",explain:"touch cria arquivo vazio."}]},
{id:"L04",unit:"Arquivos",level:"Iniciante",title:"Copiar, mover e remover",goal:"Manipular arquivos com cp, mv e rm.",tasks:[
{prompt:"Volte para a pasta pessoal.",command:"cd ~",check:(r,s)=>s.cwd==="/home/aluno",hint:"cd ~",explain:"~ representa home."},
{prompt:"Copie boas-vindas.txt.",command:"cp boas-vindas.txt boas-vindas-copia.txt",check:(r,s)=>Boolean(s.fs["/home/aluno/boas-vindas-copia.txt"]),hint:"cp origem destino",explain:"cp copia arquivos."},
{prompt:"Renomeie a cópia para inicio.txt.",command:"mv boas-vindas-copia.txt inicio.txt",check:(r,s)=>Boolean(s.fs["/home/aluno/inicio.txt"]),hint:"mv origem destino",explain:"mv move ou renomeia."}]},
{id:"L05",unit:"Texto e busca",level:"Fundamentos",title:"cat, echo e grep",goal:"Exibir, gravar e pesquisar conteúdo.",tasks:[
{prompt:"Exiba boas-vindas.txt.",command:"cat boas-vindas.txt",check:r=>r.includes("Laboratório Linux"),hint:"cat boas-vindas.txt",explain:"cat exibe arquivos."},
{prompt:"Grave Minha primeira pratica em registro.txt.",command:"echo Minha primeira pratica > registro.txt",check:(r,s)=>s.fs["/home/aluno/registro.txt"]?.content?.includes("Minha primeira pratica"),hint:"echo texto > arquivo",explain:"> redireciona saída."},
{prompt:"Pesquise Linux em boas-vindas.txt.",command:"grep Linux boas-vindas.txt",check:r=>r.includes("Linux"),hint:"grep palavra arquivo",explain:"grep pesquisa linhas."}]},
{id:"L06",unit:"Permissões",level:"Fundamentos",title:"Permissões chmod",goal:"Interpretar e alterar permissões.",tasks:[
{prompt:"Consulte permissões de relatorio.txt.",command:"ls -l relatorio.txt",check:r=>r.includes("relatorio.txt"),hint:"ls -l relatorio.txt",explain:"ls -l apresenta permissões."},
{prompt:"Defina permissão 644.",command:"chmod 644 relatorio.txt",check:(r,s)=>s.fs["/home/aluno/relatorio.txt"]?.mode==="644",hint:"chmod 644 relatorio.txt",explain:"644 equivale a rw-r--r--."},
{prompt:"Adicione execução ao dono de script.sh.",command:"chmod u+x script.sh",check:(r,s)=>s.fs["/home/aluno/script.sh"]?.mode==="744",hint:"chmod u+x script.sh",explain:"u+x acrescenta execução ao dono."}]},
{id:"L07",unit:"Usuários",level:"Fundamentos",title:"Usuários e privilégios",goal:"Compreender identidade, grupos e sudo.",tasks:[
{prompt:"Exiba UID, GID e grupos.",command:"id",check:r=>r.includes("aluno"),hint:"Use id.",explain:"id apresenta usuário e grupos."},
{prompt:"Crie o usuário laboratorio2.",command:"sudo adduser laboratorio2",check:(r,s)=>s.users.includes("laboratorio2"),hint:"sudo adduser laboratorio2",explain:"adduser cria usuário simulado."},
{prompt:"Liste contas locais.",command:"cat /etc/passwd",check:r=>r.includes("laboratorio2"),hint:"cat /etc/passwd",explain:"/etc/passwd registra contas locais."}]},
{id:"L08",unit:"Pacotes",level:"Fundamentos",title:"Gerenciamento de pacotes",goal:"Simular atualização e instalação via apt/dpkg.",tasks:[
{prompt:"Atualize índices de pacotes.",command:"sudo apt update",check:r=>r.includes("concluída"),hint:"sudo apt update",explain:"apt update atualiza índices."},
{prompt:"Instale htop.",command:"sudo apt install htop",check:(r,s)=>s.packages.includes("htop"),hint:"sudo apt install htop",explain:"apt install instala pacotes simulados."},
{prompt:"Consulte pacotes instalados.",command:"dpkg -l",check:r=>r.includes("htop"),hint:"dpkg -l",explain:"dpkg -l lista pacotes."}]},
{id:"L09",unit:"Rede",level:"Intermediário",title:"Diagnóstico de rede",goal:"Identificar interfaces, IP e conectividade.",tasks:[
{prompt:"Exiba interfaces e IP.",command:"ip a",check:r=>r.includes("192.168.10.20"),hint:"ip a",explain:"ip a mostra interfaces."},
{prompt:"Teste o gateway.",command:"ping -c 4 192.168.10.1",check:r=>r.includes("0% packet loss"),hint:"ping -c 4 192.168.10.1",explain:"ping testa conectividade."},
{prompt:"Mostre tabela de rotas.",command:"ip route",check:r=>r.includes("default via 192.168.10.1"),hint:"ip route",explain:"ip route lista rotas."}]},
{id:"L10",unit:"Processos",level:"Intermediário",title:"Processos e monitoramento",goal:"Visualizar processos e uso de recursos.",tasks:[
{prompt:"Liste processos.",command:"ps",check:r=>r.includes("bash"),hint:"Use ps.",explain:"ps lista processos."},
{prompt:"Execute monitoramento simulado.",command:"top",check:r=>r.includes("CPU"),hint:"Use top.",explain:"top mostra consumo."},
{prompt:"Consulte espaço em disco.",command:"df -h",check:r=>r.includes("/dev/sda1"),hint:"df -h",explain:"df -h mostra disco."}]},
{id:"L11",unit:"Compactação",level:"Intermediário",title:"tar e gzip",goal:"Criar e listar arquivos compactados.",tasks:[
{prompt:"Crie projeto.tar.gz a partir da pasta redes.",command:"tar -czvf projeto.tar.gz redes",check:(r,s)=>Boolean(s.fs["/home/aluno/projeto.tar.gz"]),hint:"tar -czvf arquivo.tar.gz pasta",explain:"tar cria pacote compactado."},
{prompt:"Liste conteúdo do pacote.",command:"tar -tzvf projeto.tar.gz",check:r=>r.includes("redes"),hint:"tar -tzvf projeto.tar.gz",explain:"tar lista sem extrair."},
{prompt:"Mostre o histórico.",command:"history",check:r=>r.includes("tar -czvf"),hint:"Use history.",explain:"history lista comandos."}]},
{id:"L12",unit:"Windows x Linux",level:"Intermediário",title:"Comparando Linux e PowerShell",goal:"Relacionar comandos Linux a cmdlets equivalentes.",tasks:[
{prompt:"Mostre o diretório atual.",command:"pwd",check:r=>r.includes("/home/aluno"),hint:"Linux pwd / PowerShell Get-Location",explain:"pwd corresponde a Get-Location."},
{prompt:"Liste arquivos e pastas.",command:"ls",check:r=>r.includes("Documentos"),hint:"Linux ls / PowerShell Get-ChildItem",explain:"ls corresponde a Get-ChildItem."},
{prompt:"Exiba nome do computador.",command:"hostname",check:r=>r.includes("lab-ubuntu"),hint:"Use hostname.",explain:"hostname mostra o nome do host."}]}
];