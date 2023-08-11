<script setup>
import MButton from '@/components/MButton.vue'


import {
carrinho, adicionarAoCarrinho, removerItemCarrinho, atualizaQuantidadeItem, limparCarrinho
} from '@/_data/carrinho.js'


function formatarPreco(preco) {
return 'R$ ' + preco.toFixed(2).replace('.', ',')
}

import { ref, computed } from 'vue'
const nome = ref('')
const data = ref('')
const email = ref('')
const endereco = ref('')
const cidade = ref('')
const estado = ref('')
const hobbie = ref([])
const linguagem = ref('')
const biografia = ref('')
const senha = ref('')
const confirmacao = ref('')
const sexo = ref('')
const ok = ref(false)
const cores = ref([])
const user = ref({
  avatar: null
})
function handleFileUpload(e) {
  const target = e.target
  if (target && target.files) {
    const file = target.files[0]
    user.value.avatar = URL.createObjectURL(file)
  }
}
function validar() {
  if (ok.value) {
    return false
  }
  if (senha.value === confirmacao.value) {
    return true;
  }
  else {
    return false;
  }
}
const mensagemErro = computed(() => {
  if (senha.value != confirmacao.value) {
    return 'As senhas devem ser iguais'
  } else {
    return ''
  }
})
</script>


<template>
<div class="carrinho">
<h1 class="title">SUAS COMPRAS &#128722;</h1>
<div class="wrap-carrinho">
<m-message v-if="carrinho.itens.length === 0"/>
<div v-else>
<div class="item-carrinho" v-for="(item, index) in carrinho.itens" :key="index">
<div class="info-livro">
<div class="imagem-livro">
<img :src="item.img" class="icon-capa-livro" />
</div>
<div class="detalhes-livro">
<div>
<p>{{ item.title }}</p>
<p class="info-livro-preco">{{ formatarPreco(item.price) }}/un</p>
</div>
<div>
<p>
Quantidade:
<input
type="number"
v-model="item.quantidade"
@change="atualizaQuantidadeItem(item)"
min="1"
/>
</p>
<p>Total: {{ formatarPreco(item.total) }}</p>
</div>
</div>
</div>
</div>
</div>
  </div>
</div>

<div class="forms">
    <form class="container" @submit.prevent="ok = validar()">
    <div>
      <h1 class="titleform">Preencha as areas a seguir:</h1>
      <h2 class="sectitle">Dados de contato:</h2>
      <label for="">Nome Completo: </label>
      <input type="text" class="input" v-on:keypress="ok = false" v-model="nome" placeholder="Insira seu nome" required />
      <hr>
      <label for="">Email: </label>
      <input type="email" class="input" v-on:keypress="ok = false" v-model="email" placeholder="insira seu email"
        required />
      <hr>
      <label for="">Senha: </label>
        <input type="password" class="input" v-on:keypress="ok = false" v-model="senha" placeholder="insira sua senha"
          minlength="6" required />
        <hr>
        <label for="">Confirmar senha: </label>
        <input type="password" class="input" v-on:keypress="ok = false" v-model="confirmacao"
          placeholder="insira sua senha novamente" minlength="6" required />
          <hr>
      <h2 class="sectitle">Endereço de Entrega:</h2>
      <div>
        <label for="">Endereço: </label>
        <input type="text" class="input" v-on:keypress="ok = false" v-model="endereco" placeholder="insira seu endereço" required />
        <hr>
        <label for="">Cidade: </label>
        <input type="text" class="input" v-on:keypress="ok = false" v-model="cidade" placeholder="insira sua cidade" required />
        <hr>
        <label for="estado">Estado: </label>
        <select v-on:keypress="ok = false" v-model="estado" class="input" required>
          <option value="ACRE">Acre</option>
          <option value="ALAGOAS">Alagoas</option>
          <option value="AMAPÁ">Amapá</option>
          <option value="AMAZONAS">Amazonas</option>
          <option value="BAHIA">Bahia</option>
          <option value="CEARÁ">Ceará</option>
          <option value="DISTRITO FEDERAL">Distrito Federal</option>
          <option value="ESPÍRITO SANTO">Espírito Santo</option>
          <option value="GOIÁS">Goías</option>
          <option value="MARANHÃO">Maranhão</option>
          <option value="MATO GROSSO">Mato Grosso</option>
          <option value="MATO GROSSO DO SUL">Mato Grosso do Sul</option>
          <option value="MINAS GERAIS">Minas Gerais</option>
          <option value="PARÁ">Pará</option>
          <option value="PARAÍBA">Paraíba</option>
          <option value="PERNAMBUCO">Pernambuco</option>
          <option value="PIAUÍ">Piauí</option>
          <option value="RIO DE JANEIRO">Rio de Janeiro</option>
          <option value="RIO GRANDE DO NORTE">Rio Grande do Norte</option>
          <option value="RIO GRANDE DO SUL">Rio Grande do Sul</option>
          <option value="RONDÔNIA">Rondônia</option>
          <option value="RORÁIMA">Roráima</option>
          <option value="SANTA CATARINA">Santa Catarina</option>
          <option value="SÃO PAULO">São Paulo</option>
          <option value="SERGIPE">Sergipe</option>
          <option value="TOCANTINS">Tocantins</option>
        </select>
        <hr>
        <h2 class="sectitle">Formas de pagamento:</h2>
        <label for="estado">Pagamento por: </label>
        <select v-on:keypress="ok = false" v-model="pagamento" class="input" required>
          <option value="Cartão">Cartão</option>
          <option value="Boleto">Boleto</option>
          <option value="Pix">Pix</option></select>  
          <hr>
         <h2 class="sectitle">Observações:</h2>
        <label for="">Está satisfeito(a)? Registre aqui qualquer obs sobre a loja: </label>
        <input type="text" class="input" v-on:keypress="ok = false" v-model="obs" style="padding: 20px;"
          placeholder="Deixe seu feedback" />
        <hr>

      </div>
      <button class="botao" type="submit">Finalizar</button>
    </div>
    <p>{{ mensagemErro }}</p>
  </form>
    <div class="dadosfinais">
    <div v-if="ok" class="container">
      <h1 class="final">Compra finalizada com sucesso!</h1>
      <p class="carrinho-total">Total da compra: {{ formatarPreco(carrinho.total) }}</p>
      <p class="dados">Dados inseridos:</p>
      <p>O nome inserido foi: {{ nome }}</p>
      <p>O email inserido foi: {{ email }}</p>
      <p>A senha inserida foi: {{ senha }}</p>
      <p>A confirmação da senha inserida foi: {{ confirmacao }}</p>
      <p>O endereço inserido foi: {{ endereco }}</p>
      <p>A cidade inserida foi: {{ cidade }}</p>
      <p>O estado inserido foi: {{ estado }}</p>
      <p>A forma de pagamento inserido foi: {{ pagamento }}</p>
      <p>Obs:{{ obs }}</p>
    </div>
   </div>
  </div>

</template>


<style scoped>
.container {
  display: flex;
  position: absolute;
  transform: translate( -50% -50% );
  flex-direction: column;
  top: 5%;
  nav-down: 20%;
  left: 20%;
  right: 0%;
  align-items: center;
  padding: 15px;
  margin: 0 auto;
  color: rgb(255, 255, 255);
  align-items: center;
  margin: 0 auto;
  margin-top: 5%;
  border-radius: 0px;
  width: 50%;
  background-color: rgb(94, 132, 155);
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(0, 0, 0, 0.2);}

.botao {
  align-items: center;
  background-color: rgb(0, 0, 0);
  color: white;
}

.img {
  width: 100px;
  height: 100px;
}

.input {
  background-color: rgb(255, 255, 255);
}
.titleform{
  color: rgb(255, 255, 255);
}
.sectitle{
  color: rgb(0, 0, 0);
}
.dadosfinais{
  color: black;
}
.final{
  color: black;
}
.dados{
  color: black;
  font-size: large;
}



.carrinho-total{
color: black;
font-size:x-large;
}
.continuecomp{
background-color: darkgreen;
color: white;
font-size: 1.1rem;
border: 1px solid #ccc;
border-radius: 5px;
padding: 5px 10px;
cursor: pointer;
}
.continuecomp:hover {
background-color: rgb(5, 49, 5)
}
.wrap-carrinho .carrinho-total {
position: fixed;
bottom: 3%;
font-size: 1.5rem;
font-weight: bold;
}


.item-carrinho .info-livro {
display: flex;
margin-bottom: 10px;
}
.detalhes-livro {
display: flex;
flex-direction: column;
width: 100%;
}
.detalhes-livro p {
margin: 0;
}
.detalhes-livro div {
display: flex;
justify-content: space-between;
width: 100%;
}


.detalhes-livro input[type='number'] {
width: 50px;
text-align: center;
border: none;
border-bottom: 1px solid black;
background-color: transparent;
margin-left: 10px;
}


.detalhes-livro button {
background-color: transparent;
border: none;
cursor: pointer;
font-size: 1.5rem;
color: black;
padding: 0;
margin: 0;
}


.info-livro-preco {
margin-left: auto;
}
.icon-capa-livro {
width: 30px;
margin-right: 10px;
}
.container-geral {
display: grid;
grid-template-columns: 3fr 1fr;
}


.carrinho {
min-width: 20%;
margin-bottom: 100%;
background-color: white;
}
.listagem-livros {
display: flex;
flex-wrap: wrap;
}
.title{
color: rgb(0, 0, 0);
}

</style>