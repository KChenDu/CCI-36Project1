# Sistema planetário com AR

alunos:

Kelven Yi Chen Du

Ricardo Macedo Pacheco

## Breve resumo do trabalho

O presente trabalho consiste em fazer uma realidade aumentada(AR) primitiva. Utilizando Javascript e sua biblioteca THREE.js.

A ideia inicial do grupo é que se pode aplicar AR em um contexto didático. Por exemplo, em uma aula de astronomia, seria
muito interessante se houvesse uma projeção do sistema solar para alunos visualizarem as planetas e seus movimentos, tornando 
o aprendizado mais intuitivo.

Assim, o foco do trabalho está em reproduzir um sistema solar que mostra, em primeiro lugar, os movimentos translacionais 
das planetas.

## Descrição dos itens

### Imagen do fundo

Seguindo a motivação didática, o grupo escolheu uma imagem de uma sala de aula e utilizou o exemplar do curso over_the_page.html 
para colocar ela como imagem do fundo.

### Criação do Sol e Vênus

Com relação aos modelos 3D, embora na prática o grupo teve que fazer 9 objetos astronômicos, pode-se entretanto resumir as implementações 
com apenas 4 deles, Sol, Vênus, Terra e Saturno.

O Sol e o Venus são os dois corpos mais simples de se fazerem. As diferenças entre eles são:

1. O Sol não precisa ser iluminado, enquanto o Vênus deve receber luz solar.
2. O Sol é fixo e o Vênus se translada em torno do Sol.

Baseado nos pontos acima, escoleu-se então utilizar MeshBasicMaterial(coloração invariante sob iluminação) para Sol e MeshLambertMaterial(colocação dependente à iluminação) 
para Venus. Em seguida, colocou se o Sol na origem(fixo) junto com uma fonte luminosa pontual(simulação da luz solar).

Para Venus, resta apenas implementar a translação dele, isso foi realizado atualizando a posição dele a cada frame, com coordenadas:

z = distância_solar_venus * cos(theta)

x = distância_solar_venus * sin(theta)

### Criação da Terra e Lua

Por outro lado, a implementação da Terra já demanda a utilização do grupo, pois simplifica bastante o movimento da lua.

De maneira sucinta, criou-se dois objetos esféricos e colocou-se o menor a uma certa distância do maior(distância lunar). Em seguida,
definiu-se um grupo contendo os dois. Por fim, podemos realizar então o movimento da Lua em torno da Terra e da Terra em torno do 
Sol como uma composição de movimentos. Por um lado, a rotação do grupo(movimento da Lua), e por outro, a atualização das coordenadas da Terra
(movimento da Terra).

## Interação com animação

## Link para trabalho