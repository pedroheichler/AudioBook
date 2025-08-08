import { useState, useRef, useEffect } from 'react';
import './App.css';
import Capa from './Capa';
import BrasCubasImg from './assets/bras_cubas.jpeg';
import SeletorCapitulos from './SeletorCapitulos';
import 'bootstrap-icons/font/bootstrap-icons.css'
import BotoesControle from './BotoesControle';
import GerenciadorFaixa from './GerenciadorFaixa';
import livro from "./assets/capitulos/livro"
import ContainerProgresso from "./ContainerProgresso"

function App() {
  //let taTocando = false;

  const [taTocando, definirTaTocando] = useState(false);
  const [faixaAtual, definirFaixaAtual] = useState(0);
  const [tempoTotalFaixa, setTempoTotalFaixa] = useState(0);
  const [tempoAtualFaixa, setTempoAtualFaixa] = useState(0);
  const tagAudio = useRef(null); 
  const barraProgresso = useRef(null);

  useEffect(() => {
    if(taTocando) {
      tocarFaixa();
    }
  }, [
    faixaAtual,
  ])

  const informacoesLivro = {
    nome: "Memórias Póstumas de Brás Cubas",
    autor: 'Machado de Assis',
    totalCapitulos: 2,
    capitulos: livro,
    capa: BrasCubasImg,
    textoAlternativo: 'Capa do livro Memórias Póstumas de Brás Cubas.',
  };

  function tocarFaixa() {
    tagAudio.current.play();
    definirTaTocando(true); 
  }

  const pausarFaixa = () => {
    tagAudio.current.pause();
    definirTaTocando(false);
  }

  const tocarOuPausarFaixa = () => {
    if(taTocando) {
      pausarFaixa();
    }
    else {
      tocarFaixa();
    }
  }

  const avancarFaixa = () => {
    if(informacoesLivro.totalCapitulos === faixaAtual + 1) {
      definirFaixaAtual(0)
    } else {
      definirFaixaAtual(faixaAtual + 1)
    }
  }
  const voltarFaixa = () => {
    if(faixaAtual === 0) {
      definirFaixaAtual(informacoesLivro.totalCapitulos - 1)
    } else {
      definirFaixaAtual(faixaAtual -1)
    }
  }

  const avancar15s = () => {
    tagAudio.current.currentTime += 15;
  };
  const retroceder15s = () => {
    tagAudio.current.currentTime -= 15;
  };

  const avancarPara = (evento) => {
    const largura = barraProgresso.current.clientWidth;
    const novoTempo = (evento.nativeEvent.offsetX/largura) * tempoTotalFaixa;
    tagAudio.current.currentTime = novoTempo;
  };

  return <>
    <Capa imagemCapa={informacoesLivro.capa} textoAlternativo={informacoesLivro.textoAlternativo}/>
    <SeletorCapitulos capituloAtual={faixaAtual+1}/>
    <ContainerProgresso tempoTotalFaixa={tempoTotalFaixa} 
    tempoAtualFaixa={tempoAtualFaixa} referencia={barraProgresso} 
    avancarPara={avancarPara} />
    <GerenciadorFaixa  faixa={informacoesLivro.capitulos[faixaAtual]} referencia={tagAudio} setTempoTotalFaixa={setTempoTotalFaixa} setTempoAtualFaixa={setTempoAtualFaixa}/>
    <BotoesControle taTocando={taTocando} tocarOuPausarFaixa={tocarOuPausarFaixa}
    avancarFaixa={avancarFaixa} voltarFaixa={voltarFaixa} 
    avancar15s={avancar15s} retroceder15s={retroceder15s}
    />
    
  </>;
  
}

export default App
