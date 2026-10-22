const WHATS = '5567981032677';
function toggleMenu(){
  const nav=document.getElementById('nav');
  const button=document.querySelector('.nav-toggle');
  if(!nav||!button)return;
  const open=nav.classList.toggle('open');
  button.setAttribute('aria-expanded',String(open));
  button.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
}

document.addEventListener('click',(event)=>{
  const nav=document.getElementById('nav');
  const header=document.querySelector('.site-header');
  const button=document.querySelector('.nav-toggle');
  if(!nav||!header||!button)return;
  if(nav.classList.contains('open')&&!header.contains(event.target)){
    nav.classList.remove('open');
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Abrir menu');
  }
});

document.addEventListener('keydown',(event)=>{
  if(event.key!=='Escape')return;
  const nav=document.getElementById('nav');
  const button=document.querySelector('.nav-toggle');
  if(nav&&button&&nav.classList.contains('open')){
    nav.classList.remove('open');
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Abrir menu');
    button.focus();
  }
});

document.querySelectorAll('#nav a').forEach(link=>link.addEventListener('click',()=>{
  const nav=document.getElementById('nav');
  const button=document.querySelector('.nav-toggle');
  if(nav&&button){nav.classList.remove('open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Abrir menu');}
}));
function v(id){return (document.getElementById(id)?.value || '').trim()}
function abrirWhats(msg){window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(msg)}`,'_blank')}

function setupMusicExperience(){
  const audio=document.getElementById('bgFlowAudio');
  const btn=document.getElementById('musicToggle');
  if(!audio||!btn) return;
  audio.volume=0.22;
  btn.addEventListener('click', async ()=>{
    try{
      if(audio.paused){
        await audio.play();
        btn.classList.add('playing');
        btn.setAttribute('aria-pressed','true');
        btn.textContent='🔊 Música ligada';
      }else{
        audio.pause();
        btn.classList.remove('playing');
        btn.setAttribute('aria-pressed','false');
        btn.textContent='🔈 Música';
      }
    }catch(err){
      btn.textContent='🎵 Toque para ouvir';
    }
  });
}
document.addEventListener('DOMContentLoaded', setupMusicExperience);
function mostrarLoadingIA(callback){const overlay=document.getElementById('aiLoadingOverlay'),bar=document.getElementById('aiProgressBar');overlay.classList.remove('hidden');bar.style.width='0%';let p=0;const i=setInterval(()=>{p+=Math.floor(Math.random()*18)+10;if(p>=100){p=100;bar.style.width=p+'%';clearInterval(i);setTimeout(()=>{overlay.classList.add('hidden');callback()},350)}else bar.style.width=p+'%'},180)}

document.getElementById('cakeForm')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const pessoas=v('pessoas');
  const data=v('dataEvento');
  const ocasiao=v('ocasiao') || 'A combinar';
  const detalhes=v('detalhesPedido') || 'Nenhum detalhe informado';

  const dataFormatada=data ? data.split('-').reverse().join('/') : 'A combinar';
  const msg=`Olá, Cida! Vim pelo site da Delícias da Cida e gostaria de fazer um pedido.

🍰 Informações iniciais:

• Quantidade de pessoas: ${pessoas}
• Data do evento: ${dataFormatada}
• Ocasião: ${ocasiao}
• Detalhes: ${detalhes}

Gostaria de combinar sabores, decoração, valor e entrega ou retirada pelo WhatsApp.`;
  abrirWhats(msg);
});

const vidaDeliciaConteudos = [
{cat:'Bolo do dia a dia',tempo:'Até 1 hora',estilo:'Café da tarde',titulo:'Bolo de cenoura simples',ing:['3 cenouras médias picadas','3 ovos','1 xícara de óleo','2 xícaras de açúcar','2 xícaras de farinha','1 colher de fermento'],prep:['Bata cenoura, ovos, óleo e açúcar no liquidificador.','Misture com a farinha em uma tigela.','Adicione o fermento por último.','Asse em forma untada até dourar.'],dica:'Para festa ou acabamento especial, peça uma opção pronta com a Cida.'},
{cat:'Bolo do dia a dia',tempo:'Até 1 hora',estilo:'Vida corrida',titulo:'Bolo de chocolate de liquidificador',ing:['3 ovos','1 xícara de leite','1/2 xícara de óleo','1 xícara de chocolate em pó','2 xícaras de farinha','1 colher de fermento'],prep:['Bata líquidos e açúcar.','Misture chocolate e farinha.','Finalize com fermento.','Asse em forno médio.'],dica:'Quer recheado e decorado? A Cida orienta no WhatsApp.'},
{cat:'Bolo do dia a dia',tempo:'Até 1 hora',estilo:'Café da tarde',titulo:'Bolo de fubá fofinho',ing:['3 ovos','1 xícara de leite','1/2 xícara de óleo','1 xícara de açúcar','1 xícara de fubá','1 xícara de farinha','1 colher de fermento'],prep:['Bata ovos, leite, óleo e açúcar.','Misture fubá e farinha.','Adicione fermento.','Asse até ficar firme.'],dica:'Sirva morno com café.'},
{cat:'Bolo do dia a dia',tempo:'Até 1 hora',estilo:'Receber visitas',titulo:'Bolo de laranja simples',ing:['3 ovos','1 laranja sem sementes','1 xícara de óleo','2 xícaras de açúcar','2 xícaras de farinha','1 colher de fermento'],prep:['Bata laranja, ovos, óleo e açúcar.','Misture a farinha.','Adicione fermento.','Asse e finalize com calda simples.'],dica:'Para apresentação premium, fale com a Cida.'},
{cat:'Bolo do dia a dia',tempo:'Até 1 hora',estilo:'Crianças em casa',titulo:'Bolo de banana com canela',ing:['3 bananas maduras','2 ovos','1/2 xícara de óleo','1 xícara de açúcar','2 xícaras de farinha','canela','1 colher de fermento'],prep:['Amasse as bananas.','Misture ovos, óleo e açúcar.','Adicione farinha, canela e fermento.','Asse até perfumar.'],dica:'Ótimo para lanche rápido.'},
{cat:'Bolo do dia a dia',tempo:'Até 1 hora',estilo:'Vida corrida',titulo:'Bolo branco básico',ing:['3 ovos','1 xícara de leite','2 colheres de manteiga','1 e 1/2 xícara de açúcar','2 xícaras de farinha','1 colher de fermento'],prep:['Bata ovos, açúcar e manteiga.','Alterne leite e farinha.','Misture fermento.','Asse em forma untada.'],dica:'Base fácil para rechear.'},
{cat:'Bolo do dia a dia',tempo:'Até 1 hora',estilo:'Café da tarde',titulo:'Bolo de coco simples',ing:['3 ovos','1 xícara de leite de coco','1/2 xícara de óleo','1 e 1/2 xícara de açúcar','2 xícaras de farinha','coco ralado','fermento'],prep:['Misture líquidos e açúcar.','Acrescente farinha e coco.','Finalize com fermento.','Asse e cubra com coco se quiser.'],dica:'Para mesa especial, peça acabamento artesanal.'},
{cat:'Bolo do dia a dia',tempo:'Até 1 hora',estilo:'Crianças em casa',titulo:'Bolo formigueiro fácil',ing:['3 ovos','1 xícara de leite','2 xícaras de farinha','1 e 1/2 xícara de açúcar','1/2 xícara de óleo','granulado','fermento'],prep:['Bata líquidos e açúcar.','Misture farinha.','Adicione granulado e fermento.','Asse em forno médio.'],dica:'Simples e divertido.'},
{cat:'Sobremesa rápida',tempo:'Até 15 minutos',estilo:'Vida corrida',titulo:'Mousse de maracujá rápida',ing:['1 leite condensado','1 creme de leite','1 medida de suco concentrado de maracujá'],prep:['Bata tudo no liquidificador.','Coloque em taças.','Gele até firmar.'],dica:'Para evento, peça copinhos doces com a Cida.'},
{cat:'Sobremesa rápida',tempo:'Até 15 minutos',estilo:'Vida corrida',titulo:'Mousse de limão prática',ing:['1 leite condensado','1 creme de leite','suco de 3 limões','raspas de limão'],prep:['Bata leite condensado e creme de leite.','Adicione limão aos poucos.','Gele e finalize com raspas.'],dica:'Fica linda em taças individuais.'},
{cat:'Sobremesa rápida',tempo:'Até 30 minutos',estilo:'Receber visitas',titulo:'Pavê simples de chocolate',ing:['biscoito maisena','leite','creme de chocolate','creme de leite','chocolate ralado'],prep:['Molhe os biscoitos rapidamente.','Monte camadas de creme e biscoito.','Finalize com chocolate.','Gele antes de servir.'],dica:'Para festa, a Cida pode orientar opções prontas.'},
{cat:'Sobremesa rápida',tempo:'Até 30 minutos',estilo:'Café da tarde',titulo:'Gelado de abacaxi fácil',ing:['abacaxi picado','açúcar','creme de leite','leite condensado','gelatina sem sabor opcional'],prep:['Cozinhe o abacaxi com açúcar.','Espere esfriar.','Misture os cremes.','Gele até firmar.'],dica:'Leve e refrescante.'},
{cat:'Sobremesa rápida',tempo:'Até 15 minutos',estilo:'Crianças em casa',titulo:'Creme de Ninho de colher',ing:['1 leite condensado','1 creme de leite','4 colheres de leite Ninho','morangos opcional'],prep:['Misture tudo em fogo baixo.','Mexa até engrossar.','Sirva frio ou morno.','Finalize com fruta.'],dica:'Para doces gourmet, consulte a Cida.'},
{cat:'Sobremesa rápida',tempo:'Até 30 minutos',estilo:'Economizar tempo',titulo:'Banana cremosa na travessa',ing:['bananas maduras','açúcar','canela','creme de leite','leite condensado opcional'],prep:['Caramelize bananas com açúcar e canela.','Coloque em travessa.','Cubra com creme.','Gele ou sirva morno.'],dica:'Ótima para aproveitar frutas maduras.'},
{cat:'Sobremesa rápida',tempo:'Até 1 hora',estilo:'Receber visitas',titulo:'Pudim rápido de liquidificador',ing:['3 ovos','1 leite condensado','2 medidas de leite','açúcar para calda'],prep:['Faça a calda.','Bata os ingredientes.','Coloque na forma.','Asse em banho-maria.'],dica:'Para evento, encomende sobremesas com acabamento profissional.'},
{cat:'Sobremesa rápida',tempo:'Até 30 minutos',estilo:'Sem sujeira',titulo:'Doce de leite cremoso caseiro',ing:['leite condensado cozido ou doce de leite pronto','creme de leite','pitada de sal','castanhas opcional'],prep:['Misture doce de leite e creme de leite.','Ajuste a textura.','Finalize com castanhas.','Sirva em copinhos.'],dica:'Simples e elegante.'},
{cat:'Docinho simples',tempo:'Até 30 minutos',estilo:'Crianças em casa',titulo:'Brigadeiro tradicional',ing:['1 leite condensado','1 colher de manteiga','3 colheres de chocolate em pó','granulado'],prep:['Misture na panela.','Mexa em fogo baixo até desgrudar.','Espere esfriar.','Enrole e passe no granulado.'],dica:'Para grandes quantidades, chame a Cida.'},
{cat:'Docinho simples',tempo:'Até 30 minutos',estilo:'Café da tarde',titulo:'Beijinho simples',ing:['1 leite condensado','1 colher de manteiga','coco ralado','cravos opcional'],prep:['Cozinhe leite condensado, manteiga e coco.','Mexa até ponto de enrolar.','Esfrie e modele.','Finalize com coco.'],dica:'Clássico de festa.'},
{cat:'Docinho simples',tempo:'Até 30 minutos',estilo:'Crianças em casa',titulo:'Bicho de pé',ing:['1 leite condensado','1 colher de manteiga','gelatina de morango ou pó sabor morango','açúcar cristal'],prep:['Misture tudo em fogo baixo.','Cozinhe até desgrudar.','Espere esfriar.','Enrole e passe no açúcar.'],dica:'Cor alegre para festa infantil.'},
{cat:'Docinho simples',tempo:'Até 30 minutos',estilo:'Receber visitas',titulo:'Brigadeiro de Ninho',ing:['1 leite condensado','1 colher de manteiga','4 colheres de leite Ninho','leite Ninho para finalizar'],prep:['Misture na panela.','Cozinhe até ponto.','Esfrie.','Enrole e passe no leite Ninho.'],dica:'Para gourmet, a Cida ajusta apresentação.'},
{cat:'Docinho simples',tempo:'Até 30 minutos',estilo:'Economizar tempo',titulo:'Cajuzinho simples',ing:['amendoim torrado moído','leite condensado','chocolate em pó','açúcar para passar'],prep:['Misture os ingredientes.','Modele em formato de cajuzinho.','Passe no açúcar.','Decore se quiser.'],dica:'Não precisa ir ao fogo.'},
{cat:'Docinho simples',tempo:'Até 30 minutos',estilo:'Receber visitas',titulo:'Palha italiana fácil',ing:['brigadeiro mole','biscoito maisena quebrado','açúcar para finalizar'],prep:['Prepare brigadeiro.','Misture biscoitos.','Espalhe em forma untada.','Corte depois de frio.'],dica:'Boa para vender ou presentear.'},
{cat:'Docinho simples',tempo:'Até 15 minutos',estilo:'Sem sujeira',titulo:'Docinho de leite em pó sem fogo',ing:['leite em pó','açúcar de confeiteiro','leite condensado aos poucos','coco opcional'],prep:['Misture secos.','Adicione leite condensado até dar ponto.','Modele bolinhas.','Finalize como preferir.'],dica:'Prático e rápido.'},
{cat:'Docinho simples',tempo:'Até 30 minutos',estilo:'Receber visitas',titulo:'Bombom de travessa simples',ing:['morango ou uva','creme branco','ganache de chocolate','travessa'],prep:['Coloque frutas na travessa.','Cubra com creme branco.','Finalize com ganache.','Gele antes de servir.'],dica:'Para eventos, peça doces finos da Cida.'},
{cat:'Pão prático',tempo:'Até 1 hora',estilo:'Café da tarde',titulo:'Pão de queijo de liquidificador',ing:['2 ovos','1 xícara de leite','1/2 xícara de óleo','2 xícaras de polvilho','1 xícara de queijo ralado','sal'],prep:['Bata líquidos.','Misture polvilho e queijo.','Coloque em forminhas.','Asse até dourar.'],dica:'Perfeito para café.'},
{cat:'Pão prático',tempo:'Até 1 hora',estilo:'Vida corrida',titulo:'Pão caseiro rápido',ing:['farinha','fermento biológico','água morna','açúcar','sal','óleo'],prep:['Misture fermento, água e açúcar.','Adicione farinha, sal e óleo.','Sove pouco.','Deixe crescer e asse.'],dica:'Para algo mais elaborado, fale com a Cida.'},
{cat:'Pão prático',tempo:'Até 1 hora',estilo:'Café da tarde',titulo:'Pão doce de liquidificador',ing:['ovos','leite morno','óleo','açúcar','fermento biológico','farinha'],prep:['Bata líquidos e açúcar.','Misture fermento e farinha.','Deixe crescer.','Modele e asse.'],dica:'Finalize com leite condensado e coco.'},
{cat:'Pão prático',tempo:'Até 1 hora',estilo:'Receber visitas',titulo:'Rosquinha simples',ing:['ovos','açúcar','leite','manteiga','farinha','fermento'],prep:['Misture tudo até dar ponto.','Modele rosquinhas.','Asse ou frite.','Passe no açúcar com canela.'],dica:'Receita de carinho.'},
{cat:'Pão prático',tempo:'Até 30 minutos',estilo:'Crianças em casa',titulo:'Bolinho de chuva',ing:['ovos','leite','açúcar','farinha','fermento','canela'],prep:['Misture até massa cremosa.','Frite colheradas.','Escorra.','Passe no açúcar com canela.'],dica:'Clássico de tarde chuvosa.'},
{cat:'Pão prático',tempo:'Até 1 hora',estilo:'Café da tarde',titulo:'Pão de leite condensado fácil',ing:['leite condensado','leite morno','ovos','óleo','fermento','farinha'],prep:['Bata líquidos.','Misture fermento e farinha.','Deixe crescer.','Asse até dourar.'],dica:'Fica macio e levemente doce.'},
{cat:'Pão prático',tempo:'Até 1 hora',estilo:'Receber visitas',titulo:'Enroladinho doce com coco',ing:['massa de pão doce','coco ralado','açúcar','manteiga','leite condensado'],prep:['Abra a massa.','Recheie com coco, açúcar e manteiga.','Enrole e corte.','Asse e finalize.'],dica:'Mais elaborado? Deixa com a Cida.'},
{cat:'Pão prático',tempo:'Até 30 minutos',estilo:'Vida corrida',titulo:'Panqueca doce simples',ing:['1 ovo','1 xícara de leite','1 xícara de farinha','1 colher de açúcar','banana ou mel'],prep:['Misture a massa.','Doure em frigideira.','Recheie com banana ou mel.','Sirva na hora.'],dica:'Rápida e sem forno.'},
{cat:'Bebida ou chá',tempo:'Até 15 minutos',estilo:'Café da tarde',titulo:'Cappuccino caseiro prático',ing:['leite em pó','café solúvel','chocolate em pó','açúcar','canela opcional'],prep:['Misture os ingredientes secos.','Guarde em pote fechado.','Use 2 colheres em leite quente.'],dica:'Prático para receber visitas.'},
{cat:'Bebida ou chá',tempo:'Até 15 minutos',estilo:'Crianças em casa',titulo:'Chocolate quente cremoso',ing:['leite','chocolate em pó','açúcar','amido de milho','creme de leite opcional'],prep:['Misture tudo frio.','Leve ao fogo mexendo.','Quando engrossar, desligue.','Finalize com creme se quiser.'],dica:'Combina com bolinho simples.'},
{cat:'Bebida ou chá',tempo:'Até 15 minutos',estilo:'Vida corrida',titulo:'Chá de limão com mel',ing:['água quente','limão','mel','gengibre opcional'],prep:['Aqueça a água.','Adicione limão e mel.','Misture e sirva.'],dica:'Conforto rápido.'},
{cat:'Bebida ou chá',tempo:'Até 15 minutos',estilo:'Sem sujeira',titulo:'Chá de camomila especial',ing:['camomila','água quente','mel opcional','casca de laranja opcional'],prep:['Faça a infusão.','Tampe por alguns minutos.','Coe e sirva.'],dica:'Para desacelerar.'},
{cat:'Bebida ou chá',tempo:'Até 15 minutos',estilo:'Vida corrida',titulo:'Café cremoso fácil',ing:['café solúvel','açúcar','água quente'],prep:['Bata tudo até formar creme.','Guarde no congelador.','Use uma colher no leite quente.'],dica:'Rende vários cafés.'},
{cat:'Bebida ou chá',tempo:'Até 15 minutos',estilo:'Café da tarde',titulo:'Leite quente aromático',ing:['leite','canela','cravo','mel ou açúcar'],prep:['Aqueça leite com especiarias.','Coe se preferir.','Adoce e sirva.'],dica:'Simples e acolhedor.'},
{cat:'Dica de casa',tempo:'Quero só uma dica rápida',estilo:'Sem sujeira',titulo:'Como tirar mancha de gordura da roupa',ing:['papel toalha','detergente neutro','água morna'],prep:['Retire o excesso com papel.','Aplique detergente na mancha.','Esfregue delicadamente.','Enxágue com água morna e lave normal.'],dica:'Teste antes em tecido delicado.'},
{cat:'Dica de casa',tempo:'Quero só uma dica rápida',estilo:'Economizar tempo',titulo:'Como tirar mancha de roupa branca',ing:['sabão neutro','bicarbonato','água morna'],prep:['Faça uma pastinha de bicarbonato e água.','Aplique na área.','Deixe agir alguns minutos.','Lave normalmente.'],dica:'Evite misturas perigosas de produtos.'},
{cat:'Dica de casa',tempo:'Quero só uma dica rápida',estilo:'Sem sujeira',titulo:'Como tirar cheiro da geladeira',ing:['bicarbonato de sódio','pote aberto','pano limpo'],prep:['Limpe prateleiras.','Coloque bicarbonato em pote aberto.','Troque a cada alguns dias.'],dica:'Ajuda a neutralizar odores.'},
{cat:'Dica de casa',tempo:'Quero só uma dica rápida',estilo:'Economizar tempo',titulo:'Como limpar panela queimada',ing:['água','bicarbonato','detergente'],prep:['Cubra o fundo com água.','Adicione bicarbonato.','Aqueça alguns minutos.','Esfregue depois de amornar.'],dica:'Não use palha agressiva em panela delicada.'},
{cat:'Dica de casa',tempo:'Quero só uma dica rápida',estilo:'Festa chegando',titulo:'Como conservar bolo caseiro',ing:['pote fechado','filme plástico','local fresco'],prep:['Espere esfriar totalmente.','Cubra bem.','Mantenha longe de sol e calor.','Refrigere se tiver recheio sensível.'],dica:'Bolo de festa deve ser orientado pela Cida.'},
{cat:'Dica de casa',tempo:'Quero só uma dica rápida',estilo:'Festa chegando',titulo:'Como organizar doces para festa',ing:['bandejas','forminhas','etiquetas','lista de sabores'],prep:['Separe por tipo.','Use bandejas baixas.','Organize sabores mais delicados na frente.','Conte por convidado.'],dica:'Para quantidade ideal, use a Delícia de Festa.'},
{cat:'Dica de casa',tempo:'Quero só uma dica rápida',estilo:'Festa chegando',titulo:'Como evitar desperdício em festa',ing:['lista de convidados','perfil da festa','horário','cardápio'],prep:['Confirme convidados.','Considere horário e refeições.','Calcule doces por pessoa.','Evite excesso sem planejamento.'],dica:'A Cida ajuda a equilibrar a mesa.'},
{cat:'Dica de casa',tempo:'Quero só uma dica rápida',estilo:'Sem sujeira',titulo:'Como deixar a cozinha cheirosa',ing:['casca de laranja','canela','água','panela pequena'],prep:['Ferva água com cascas e canela.','Deixe perfumar por alguns minutos.','Desligue e mantenha seguro.'],dica:'Nunca deixe panela sem supervisão.'},
{cat:'Solução para festa',tempo:'Quero só uma dica rápida',estilo:'Festa chegando',titulo:'Quanto doce servir por pessoa',ing:['convidados','tipo de festa','horário','perfil da mesa'],prep:['Festa simples: 4 a 5 doces por pessoa.','Mesa equilibrada: 5 a 7.','Casamento/premium: 8 a 10.','Confirme com a Cida antes de fechar.'],dica:'Use a calculadora Delícia de Festa.'},
{cat:'Solução para festa',tempo:'Quero só uma dica rápida',estilo:'Festa chegando',titulo:'Como escolher sabores de doces',ing:['chocolate','ninho','frutas','nozes','opções tradicionais'],prep:['Misture sabores clássicos e especiais.','Tenha opção com chocolate.','Inclua sabores leves.','Evite escolher tudo muito parecido.'],dica:'A Cida monta a composição ideal.'},
{cat:'Solução para festa',tempo:'Quero só uma dica rápida',estilo:'Receber visitas',titulo:'Mesa bonita sem exagero',ing:['bandejas','altura','flores','doces variados'],prep:['Use alturas diferentes.','Centralize o bolo.','Agrupe doces por tipo.','Deixe respiro visual.'],dica:'Para eventos, a Delícias da Cida ajuda.'},
{cat:'Solução para festa',tempo:'Quero só uma dica rápida',estilo:'Festa chegando',titulo:'Checklist doce para aniversário',ing:['bolo','docinhos','velas','pratinhos','talheres','guardanapos'],prep:['Confirme convidados.','Defina bolo e docinhos.','Separe itens de servir.','Combine retirada/entrega com antecedência.'],dica:'Peça sua Delícia — 0 trabalho.'}
];
const vidaReceitasExtras = [
  {cat:'Receita',titulo:'Bolo de cenoura com cobertura de chocolate',ing:['3 cenouras médias em rodelas','4 ovos','1 xícara de óleo','2 xícaras de açúcar','2 e 1/2 xícaras de farinha de trigo','1 colher de fermento','chocolate, manteiga, açúcar e leite para a cobertura'],prep:['Bata cenoura, ovos, óleo e açúcar até ficar liso.','Passe para uma tigela e misture a farinha sem bater demais.','Junte o fermento e asse em forno preaquecido a 180 °C.','Cozinhe a cobertura até engrossar levemente e espalhe sobre o bolo.'],dica:'Cenoura em excesso pode deixar o bolo pesado; use medidas niveladas.',fonte:'Panelinha',url:'https://panelinha.com.br/home/cenoura'},
  {cat:'Receita',titulo:'Bolo de banana com pedaços de chocolate',ing:['4 bananas maduras','2 ovos','1/2 xícara de óleo','1 xícara de açúcar','2 xícaras de farinha','1 colher de fermento','chocolate picado e canela a gosto'],prep:['Amasse as bananas e misture com ovos, óleo e açúcar.','Acrescente farinha e canela.','Junte fermento e chocolate delicadamente.','Asse até dourar e o palito sair limpo.'],dica:'Bananas bem maduras deixam a receita mais doce e perfumada.',fonte:'Panelinha',url:'https://panelinha.com.br/home/bolos'},
  {cat:'Receita',titulo:'Bolo de laranja fofinho',ing:['3 ovos','1 xícara de suco de laranja','1/2 xícara de óleo','1 e 1/2 xícara de açúcar','2 xícaras de farinha','1 colher de fermento','raspas de laranja'],prep:['Misture ovos, suco, óleo e açúcar.','Acrescente farinha e raspas.','Finalize com o fermento.','Asse em forno médio até dourar.'],dica:'Use apenas a parte colorida da casca para não amargar.',fonte:'Panelinha',url:'https://panelinha.com.br/home/bolos'},
  {cat:'Receita',titulo:'Brigadeiro cremoso de chocolate',ing:['1 lata de leite condensado','1/2 xícara de leite','1 colher de manteiga','3 colheres de chocolate em pó','raspas de chocolate para finalizar'],prep:['Misture tudo ainda com o fogo desligado.','Cozinhe em fogo baixo, mexendo sempre.','Desligue quando o creme abrir caminho no fundo da panela.','Sirva de colher ou deixe esfriar para enrolar.'],dica:'Fogo baixo ajuda a manter a textura lisa e evita queimar.',fonte:'Panelinha',url:'https://panelinha.com.br/receita/brigadeiro'},
  {cat:'Receita',titulo:'Pão de queijo caseiro',ing:['2 xícaras de polvilho azedo','1 xícara de leite','1/2 xícara de óleo','2 ovos','1 e 1/2 xícara de queijo curado ralado','sal a gosto'],prep:['Aqueça leite, óleo e sal.','Despeje sobre o polvilho e misture para escaldar.','Quando amornar, junte ovos e queijo.','Modele com as mãos untadas e asse até crescer e dourar.'],dica:'A massa pode ficar pegajosa; unte as mãos em vez de acrescentar farinha.',fonte:'Panelinha',url:'https://panelinha.com.br/receita/pao-de-queijo'},
  {cat:'Receita',titulo:'Mousse rápida de limão',ing:['1 lata de leite condensado','1 caixa de creme de leite','suco de 3 limões','raspas de limão'],prep:['Misture leite condensado e creme de leite.','Adicione o suco aos poucos até engrossar.','Distribua em taças.','Gele e finalize com raspas.'],dica:'Acrescente o limão aos poucos para controlar a acidez.',fonte:'TudoGostoso',url:'https://www.tudogostoso.com.br/receita/136094-pave-de-limao-e-chocolate.html'},
  {cat:'Receita',titulo:'Pavê de chocolate com limão',ing:['biscoito maisena','leite para umedecer','1 creme de chocolate','1 mousse de limão','raspas de limão ou chocolate'],prep:['Umedeça rapidamente os biscoitos.','Monte uma camada de biscoito e outra de creme de chocolate.','Repita e finalize com mousse de limão.','Gele bem antes de servir.'],dica:'Molhe os biscoitos rapidamente para o pavê não perder estrutura.',fonte:'TudoGostoso',url:'https://www.tudogostoso.com.br/receita/122229-pave-de-chocolate-com-mousse-de-limao.html'},
  {cat:'Receita',titulo:'Bolo-pudim de chocolate',ing:['açúcar para caramelizar','mistura simples de pudim de leite','massa de bolo de chocolate','água quente para o banho-maria'],prep:['Caramelize uma forma com furo central.','Coloque a mistura do pudim.','Despeje a massa de chocolate por cima com cuidado.','Asse em banho-maria e desenforme somente depois de frio.'],dica:'A inversão das camadas acontece durante o forno; não misture depois de montar.',fonte:'TudoGostoso',url:'https://www.tudogostoso.com.br/receita/52035-bolo-de-chocolate-com-pudim-de-leite.html'},
  {cat:'Receita',titulo:'Bolo de fubá cremoso',ing:['3 ovos','3 xícaras de leite','2 xícaras de açúcar','1 xícara de fubá','2 colheres de farinha','2 colheres de manteiga','queijo ralado opcional','1 colher de fermento'],prep:['Bata todos os ingredientes, deixando o fermento por último.','Coloque em forma untada; a massa fica líquida.','Asse em forno médio até dourar.','Espere amornar para cortar e preservar a camada cremosa.'],dica:'A textura líquida antes de assar é normal nessa receita.',fonte:'Panelinha',url:'https://panelinha.com.br/home/bolos'},
  {cat:'Receita',titulo:'Mousse de maracujá de três ingredientes',ing:['1 lata de leite condensado','1 caixa de creme de leite','1 medida de suco concentrado de maracujá'],prep:['Bata todos os ingredientes até ficar uniforme.','Coloque em uma travessa ou em taças.','Leve à geladeira por pelo menos 2 horas.','Finalize com polpa de maracujá se desejar.'],dica:'O suco concentrado dá sabor mais marcante sem deixar a mousse aguada.',fonte:'TudoGostoso',url:'https://www.tudogostoso.com.br/'},
  {cat:'Receita',titulo:'Bolo de chocolate de liquidificador',ing:['3 ovos','1 xícara de leite','1/2 xícara de óleo','1 xícara de açúcar','1 xícara de chocolate em pó','2 xícaras de farinha','1 colher de fermento'],prep:['Bata ovos, leite, óleo e açúcar.','Transfira para uma tigela e misture chocolate e farinha.','Junte o fermento.','Asse em forno preaquecido até o palito sair limpo.'],dica:'Misture a farinha à mão para manter o bolo mais leve.',fonte:'TudoGostoso',url:'https://www.tudogostoso.com.br/'},
  {cat:'Receita',titulo:'Bolo gelado de coco',ing:['massa de bolo branco','1 vidro de leite de coco','leite condensado','coco ralado','papel-alumínio para embrulhar'],prep:['Asse o bolo branco e corte em quadrados.','Misture leite de coco e leite condensado.','Regue os pedaços ainda mornos.','Passe no coco, embrulhe e gele.'],dica:'Deixe gelar por algumas horas para a calda penetrar bem.',fonte:'Panelinha',url:'https://panelinha.com.br/home/bolos'}
];

const vidaLimpezaExtras = [
  {cat:'Limpeza',titulo:'Panela queimada sem esfregar demais',ing:['água morna','detergente neutro','bicarbonato de sódio','esponja macia'],prep:['Espere a panela esfriar.','Cubra a área queimada com água, detergente e um pouco de bicarbonato.','Deixe agir e aqueça por poucos minutos, se o material permitir.','Espere amornar e limpe com esponja macia.'],dica:'Confira as recomendações do fabricante, principalmente em panelas antiaderentes.',fonte:'Consul',url:'https://www.consul.com.br/facilita-consul/ihhh-agora/como-limpar-panela-queimada-sem-estraga-la'},
  {cat:'Limpeza',titulo:'Geladeira limpa e sem cheiro',ing:['detergente neutro','água','pano macio','bicarbonato em pote aberto'],prep:['Desligue a geladeira e retire os alimentos.','Lave as peças removíveis e seque bem.','Passe pano com água e detergente neutro por dentro.','Depois de seca, coloque um potinho aberto com bicarbonato para ajudar nos odores.'],dica:'Não use produtos abrasivos e não jogue água diretamente no aparelho.',fonte:'Consul',url:'https://www.consul.com.br/facilita-consul/simples-assim/como-limpar-geladeira'},
  {cat:'Limpeza',titulo:'Forno com gordura recente',ing:['detergente neutro','pano úmido','pano macio seco'],prep:['Desligue o forno da tomada e espere esfriar.','Retire grades e bandejas.','Passe pano úmido com detergente neutro.','Remova os resíduos e seque antes de usar novamente.'],dica:'Limpar logo após o uso, quando estiver frio, evita gordura encrostada.',fonte:'Electrolux',url:'https://loja.electrolux.com.br/homepedia/ambientes/cozinha/como-limpar-forno'},
  {cat:'Limpeza',titulo:'Micro-ondas sem cheiro de comida',ing:['detergente neutro','pano úmido','pano macio seco'],prep:['Tire o aparelho da tomada.','Passe pano úmido com detergente neutro no interior.','Retire o produto com outro pano úmido.','Seque e deixe a porta aberta por alguns minutos.'],dica:'Evite produtos abrasivos e nunca molhe o painel ou as entradas de ventilação.',fonte:'Electrolux',url:'https://loja.electrolux.com.br/homepedia/ambientes/cozinha/como-tirar-odor-de-microondas'},
  {cat:'Limpeza',titulo:'Fogão limpo sem riscar',ing:['detergente neutro','água morna','esponja macia','pano seco'],prep:['Espere o fogão esfriar e retire as peças soltas.','Amoleça a gordura com água morna e detergente.','Limpe com a parte macia da esponja.','Seque bem antes de recolocar as peças.'],dica:'Evite palha de aço em vidro e inox.',fonte:'Electrolux',url:'https://loja.electrolux.com.br/homepedia/cuidar-bem/como-limpar-fogao-dicas'},
  {cat:'Limpeza',titulo:'Potes plásticos sem cheiro',ing:['água morna','detergente neutro','bicarbonato de sódio'],prep:['Lave o pote normalmente.','Faça uma solução leve de água morna com bicarbonato.','Deixe agir por alguns minutos.','Enxágue e seque aberto.'],dica:'Não use água fervente em plástico que não seja próprio para altas temperaturas.',fonte:'Consul',url:'https://www.consul.com.br/facilita-consul/geral/blog-economize-com-produtos-de-limpeza-caseiros/'},
  {cat:'Limpeza',titulo:'Tábua de cozinha bem higienizada',ing:['detergente neutro','água corrente','esponja exclusiva','pano limpo ou escorredor'],prep:['Retire os resíduos logo após o uso.','Lave os dois lados com detergente e água corrente.','Enxágue completamente.','Deixe secar em pé, com circulação de ar.'],dica:'Tenha tábuas separadas para carnes cruas e alimentos prontos.'},
  {cat:'Limpeza',titulo:'Regra de ouro para produtos de limpeza',ing:['rótulo do produto','luvas quando indicadas','ambiente ventilado'],prep:['Leia o rótulo antes de usar.','Use somente a quantidade indicada.','Mantenha o ambiente ventilado.','Guarde fora do alcance de crianças e animais.'],dica:'Nunca misture água sanitária com vinagre, álcool, amônia ou outros produtos.'}
];

let vidaAtualTexto='';
let vidaModoAtual='';
let vidaUltimoTitulo='';

function escolherVidaAleatoria(lista){
  if(!lista.length) return null;
  const opcoes=lista.filter(item=>item.titulo!==vidaUltimoTitulo);
  const base=opcoes.length?opcoes:lista;
  const item=base[Math.floor(Math.random()*base.length)];
  vidaUltimoTitulo=item.titulo;
  return item;
}

function gerarVidaDelicia(modo){
  vidaModoAtual=modo||vidaModoAtual||'receita';
  const box=document.getElementById('vidaResultado');
  if(!box) return;
  let lista=[];
  if(vidaModoAtual==='limpeza'){
    const antigas=vidaDeliciaConteudos.filter(x=>x.cat==='Dica de casa' && !/festa|bolo/i.test(x.titulo));
    lista=[...vidaLimpezaExtras,...antigas];
  }else{
    const antigas=vidaDeliciaConteudos.filter(x=>!['Dica de casa','Solução para festa'].includes(x.cat));
    lista=[...vidaReceitasExtras,...antigas];
  }
  const r=escolherVidaAleatoria(lista);
  if(!r) return;
  const tipo=vidaModoAtual==='limpeza'?'Dica de limpeza':'Receita da vez';
  const itensTitulo=vidaModoAtual==='limpeza'?'Você vai precisar':'Ingredientes';
  const acaoTitulo=vidaModoAtual==='limpeza'?'Como fazer':'Modo de preparo';
  const fonte=r.fonte&&r.url?`<a class="vida-source" href="${r.url}" target="_blank" rel="noopener">Inspiração consultada: ${r.fonte} ↗</a>`:'';
  vidaAtualTexto=`${tipo}: ${r.titulo}\n\n${itensTitulo}:\n${r.ing.map(i=>'- '+i).join('\n')}\n\n${acaoTitulo}:\n${r.prep.map((p,i)=>`${i+1}. ${p}`).join('\n')}\n\nDica da Cida: ${r.dica}`;
  box.innerHTML=`<div class="vida-result-head"><span class="pill">${tipo}</span><button class="vida-next-button" type="button" onclick="gerarVidaDelicia('${vidaModoAtual}')">Ver outra ↻</button></div><h3>${r.titulo}</h3><div class="vida-content-grid"><div><h4>${itensTitulo}</h4><ul>${r.ing.map(i=>`<li>${i}</li>`).join('')}</ul></div><div><h4>${acaoTitulo}</h4><ol>${r.prep.map(i=>`<li>${i}</li>`).join('')}</ol></div></div><p class="recipe-note"><strong>Dica da Cida:</strong> ${r.dica}</p>${fonte}<div class="recipe-actions vida-actions-simple"><button class="btn btn-ghost-dark" type="button" onclick="navigator.clipboard.writeText(vidaAtualTexto);alert('Conteúdo copiado!')">Copiar</button><button class="btn btn-primary" type="button" onclick="gerarVidaDelicia('${vidaModoAtual}')">Mostrar outra</button></div>`;
  box.scrollIntoView({behavior:'smooth',block:'nearest'});
}

document.getElementById('weddingForm')?.addEventListener('submit',(e)=>{e.preventDefault(); const msg=`Olá, Cida! Vim pelo site da Delícias da Cida e gostaria de solicitar um orçamento personalizado para casamento.

💍 Informações dos noivos:

• Nome dos noivos: ${v('nomesNoivos')}
• Data do casamento: ${v('dataCasamento')}
• Horário da festa: ${v('horaCasamento')}
• Local do evento: ${v('localCasamento')}
• Quantidade aproximada de convidados: ${v('convidadosCasamento')}
• Interesse principal: ${v('interesseCasamento')}
• Estilo da festa: ${v('estiloCasamento')}
• Preferência de sabores: ${v('saboresCasamento')}

Gostaria de verificar disponibilidade, sugestões de quantidade, opções de doces e orientação para montar uma mesa doce especial.`; abrirWhats(msg);});

document.getElementById('partySweetForm')?.addEventListener('submit',(e)=>{e.preventDefault();
  const raw=parseInt(v('convidadosFesta'),10)||100;
  const convidados = raw>1000 ? 1001 : Math.max(100,raw);
  const tipo=v('tipoFesta'),horario=v('horarioFesta'),data=v('dataFesta'),interesse=v('interesseDoces'),ver=v('verFotosValores');
  let minPP=5,maxPP=7;
  if(tipo==='Casamento'){minPP=8;maxPP=10}
  if(tipo==='Aniversário infantil'){minPP=6;maxPP=8}
  if(tipo==='Aniversário adulto'){minPP=5;maxPP=7}
  if(tipo==='Chá de bebê / revelação'){minPP=5;maxPP=8}
  if(tipo==='Evento corporativo'){minPP=4;maxPP=6}
  if(tipo==='Formatura'||tipo==='Bodas'){minPP=7;maxPP=9}
  if(horario==='Tarde'){minPP+=1;maxPP+=1} if(horario==='Noite'){minPP=Math.max(4,minPP-1);maxPP=Math.max(5,maxPP-1)}
  const labelConvidados = convidados>1000 ? 'Acima de 1000 convidados — orçamento direto com a Cida' : `${convidados} convidados`;
  const min=convidados>1000?'sob consulta':Math.ceil((convidados*minPP)/10)*10;
  const max=convidados>1000?'sob consulta':Math.ceil((convidados*maxPP)/10)*10;
  const estimativa = convidados>1000 ? 'Sob consulta pelo WhatsApp' : `${min} a ${max} doces artesanais`;
  const msg=`Olá, Cida! Vim pelo site da Delícias da Cida e montei uma prévia para doces de festa.

🍬 Delícia de Festa:

• Tipo de festa: ${tipo}
• Data da festa: ${data || 'A confirmar'}
• Horário: ${horario}
• Quantidade de convidados: ${labelConvidados}
• Doces de interesse: ${interesse}
• Estimativa sugerida pelo site: ${estimativa}
• Quero ver fotos e valores: ${ver}

Gostaria de ver fotos, opções disponíveis, valores e confirmar a quantidade ideal para minha festa.`;
  const btn = ver==='Sim, quero ver no WhatsApp' ? `<button class="btn btn-primary full" onclick='abrirWhats(${JSON.stringify(msg)})'>Sim, quero ver fotos e valores</button>` : `<button class="btn btn-ghost-dark full" onclick='abrirWhats(${JSON.stringify(msg)})'>Enviar prévia para a Cida</button>`;
  document.getElementById('partySweetResult').innerHTML=`<span class="pill">Sua Delícia de Festa</span><h3>${estimativa}</h3><p>Estimativa para <strong>${labelConvidados}</strong>, <strong>${tipo}</strong>, data <strong>${data || 'a confirmar'}</strong> e horário <strong>${horario}</strong>.</p><p>A Cida confirma sabores, fotos, opções, valores e quantidade ideal pelo WhatsApp.</p>${btn}`;
});


// Lembrei de Você - Bentô Cake simplificado
function getBentoChoice(){
  const phraseEl=document.getElementById('bentoPhrase');
  const option=phraseEl?.selectedOptions?.[0];
  const phrase=phraseEl?.value || '';
  const size=option?.dataset?.size || '';
  const isMega=size==='mega';
  return {
    phrase,
    size,
    isMega,
    kind: size ? (isMega ? 'Mega Bentô Cake' : 'Mini Bentô Cake') : 'Tamanho a definir',
    price: size ? (isMega ? 'A partir de R$ 84,90' : 'A partir de R$ 49,90') : 'Escolha uma frase'
  };
}
function updateBentoResult(){
  const box=document.getElementById('bentoFunResult');
  const auto=document.getElementById('bentoSizeAuto');
  if(!box||!auto) return;
  const c=getBentoChoice();
  const fileObj=document.getElementById('bentoUpload')?.files?.[0];
  if(!c.phrase){
    auto.innerHTML='<span>🎂 Tamanho indicado</span><strong>Escolha uma frase</strong><small>O tamanho aparece automaticamente.</small>';
    box.innerHTML='<span class="pill">Pedido simples</span><h4>Escolha uma frase para começar.</h4><p>O site indica automaticamente o tamanho do Bentô.</p>';
    return;
  }
  auto.innerHTML=`<span>🎂 Tamanho indicado</span><strong>${c.kind}</strong><small>${c.price}</small>`;
  box.innerHTML=`<span class="pill">${c.kind}</span><h4>${c.price}</h4><p><strong>Frase:</strong> ${c.phrase}</p><p><strong>Massa:</strong> ${v('bentoMassa') || 'selecione'} • <strong>Recheio:</strong> ${v('bentoRecheio') || 'selecione'}</p>${fileObj?'<p>📷 Imagem de inspiração selecionada.</p>':''}`;
}
function previewBentoUpload(file){
  const help=document.getElementById('bentoUploadName');
  const loading=document.getElementById('bentoUploadLoading');
  const preview=document.getElementById('bentoUploadPreview');
  if(!help||!loading||!preview) return;
  preview.classList.add('hidden');
  preview.innerHTML='';
  if(!file){
    help.textContent='Você pode escolher uma foto ou flork. Ela será enviada por link quando possível; caso contrário, envie na conversa do WhatsApp.';
    loading.classList.add('hidden');
    updateBentoResult();
    return;
  }
  help.textContent=`Imagem selecionada: ${file.name}`;
  loading.classList.remove('hidden');
  const reader=new FileReader();
  reader.onload=()=>{
    loading.classList.add('hidden');
    preview.innerHTML=`<img src="${reader.result}" alt="Prévia da inspiração escolhida"><span>${file.name}</span>`;
    preview.classList.remove('hidden');
    updateBentoResult();
  };
  reader.onerror=()=>{
    loading.classList.add('hidden');
    preview.innerHTML='<span>Não foi possível mostrar a prévia. Você ainda pode enviar a imagem direto no WhatsApp.</span>';
    preview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}
['bentoPhrase','bentoMassa','bentoRecheio'].forEach(id=>document.getElementById(id)?.addEventListener('change',updateBentoResult));
document.getElementById('bentoUpload')?.addEventListener('change',()=>{
  previewBentoUpload(document.getElementById('bentoUpload')?.files?.[0]);
});
function safeFileName(name){
  const base=(name||'referencia-bento').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9._-]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');
  return base || 'referencia-bento.jpg';
}
async function uploadBentoReference(file){
  if(!file) return null;
  const allowed=['image/jpeg','image/png','image/webp'];
  if(!allowed.includes(file.type)) throw new Error('Formato não permitido. Use JPG, PNG ou WEBP.');
  if(file.size > 5 * 1024 * 1024) throw new Error('Imagem maior que 5MB. Envie uma imagem menor.');
  if(window.BENTO_UPLOAD_ENDPOINT){
    const form=new FormData();
    form.append('file',file);
    form.append('source','delicias-da-cida-bento');
    const res=await fetch(window.BENTO_UPLOAD_ENDPOINT,{method:'POST',body:form});
    if(!res.ok) throw new Error('upload-failed');
    const data=await res.json();
    return data.url || data.publicUrl || null;
  }
  const cfg=window.SUPABASE_BENTO_CONFIG;
  if(!cfg || !cfg.url || !cfg.key || !cfg.bucket) return null;
  const ext=(file.name.split('.').pop() || (file.type.split('/')[1] || 'jpg')).toLowerCase().replace(/[^a-z0-9]/g,'') || 'jpg';
  const stamp=new Date().toISOString().slice(0,10);
  const random=Math.random().toString(36).slice(2,10);
  const path=`${cfg.folder || 'pedidos-bento'}/${stamp}/${Date.now()}-${random}-${safeFileName(file.name || ('referencia.'+ext))}`;
  const uploadUrl=`${cfg.url.replace(/\/$/,'')}/storage/v1/object/${cfg.bucket}/${encodeURIComponent(path).replace(/%2F/g,'/')}`;
  const res=await fetch(uploadUrl,{method:'POST',headers:{'apikey':cfg.key,'Authorization':`Bearer ${cfg.key}`,'Content-Type':file.type || 'application/octet-stream','x-upsert':'false'},body:file});
  if(!res.ok) throw new Error('upload-failed');
  return `${cfg.url.replace(/\/$/,'')}/storage/v1/object/public/${cfg.bucket}/${encodeURIComponent(path).replace(/%2F/g,'/')}`;
}
document.getElementById('bentoFunForm')?.addEventListener('submit',async (e)=>{
  e.preventDefault();
  const c=getBentoChoice();
  const fileObj=document.getElementById('bentoUpload')?.files?.[0];
  if(!c.phrase || !v('bentoMassa') || !v('bentoRecheio')){
    updateBentoResult();
    alert('Escolha a frase, a massa e o recheio para continuar.');
    return;
  }
  const loading=document.getElementById('bentoUploadLoading');
  let refUrl=null;
  let imageLine='Não enviei imagem de inspiração';
  if(fileObj){
    if(loading) loading.classList.remove('hidden');
    try{ refUrl=await uploadBentoReference(fileObj); }catch(err){ refUrl=null; }
    imageLine=refUrl ? `Imagem de inspiração: ${refUrl}` : `Tenho uma imagem de inspiração (${fileObj.name}) e vou enviá-la nesta conversa`;
  }
  if(loading) loading.classList.add('hidden');
  const msg=`Olá, Cida! Vim pelo site e quero pedir um Bentô Cake.

🎂 Meu pedido:
• Frase: ${c.phrase}
• Tamanho indicado: ${c.kind}
• Massa: ${v('bentoMassa')}
• Recheio: ${v('bentoRecheio')}
• ${imageLine}

Quero confirmar valor, decoração, data e disponibilidade.${fileObj && !refUrl ? '\n\nVou enviar a imagem de referência logo abaixo.' : ''}`;
  abrirWhats(msg);
  if(fileObj && !refUrl) setTimeout(()=>alert('O WhatsApp foi aberto. Agora envie a imagem selecionada na conversa com a Cida.'),300);
});
