# Sistema planetário com AR

alunos:

Kelven Yi Chen Du

Ricardo Macedo Pacheco

## Breve resumo do trabalho

O presente trabalho consiste em fazer uma realidade aumentada(AR) primitiva. Utilizando Javascript e a biblioteca THREE.js.

A ideia inicial do grupo foi a de aplicar AR em um contexto didático. Por exemplo, em uma aula de astronomia, seria muito interessante se houvesse uma projeção do sistema solar para alunos visualizarem os planetas e seus movimentos, tornando o aprendizado mais intuitivo.

Assim, o foco do trabalho está em reproduzir o sistema solar que mostra, em primeiro lugar, os movimentos translacionais dos planetas e corpos celestes adjuntos.

Como curiosidade, usamos as velocidades angulares proporcionais às reais para movimentar os planetas a Lua.

## Descrição dos itens

### Imagem de fundo

Seguindo a motivação didática, o grupo escolheu uma imagem de uma sala de aula e utilizou o exemplar do curso over_the_page.html para a inserir como imagem de fundo.

### Criação do Sol e Vênus

Com relação aos modelos 3D, embora na prática o grupo teve que fazer 9 objetos astronômicos, pode-se entretanto resumir as implementações com apenas 4 deles, Sol, Vênus, Terra e Saturno.

O Sol e o Venus são os dois corpos mais simples de se fazer. As diferenças entre eles são:

1. O Sol não precisa ser iluminado, enquanto Vênus deve receber luz solar.
2. O Sol é fixo e Vênus translada em torno do Sol.

Baseado nos pontos acima, escoleu-se então utilizar MeshBasicMaterial(coloração invariante sob iluminação) para o Sol e MeshLambertMaterial(coloração fosca sujeita à iluminação) para Venus. Em seguida, colocou-se o Sol na origem(fixo) junto com uma fonte luminosa pontual(simulação da luz solar).

Para Venus, resta apenas implementar a translação dele, isso foi realizado atualizando a posição dele a cada frame, com coordenadas:

    z = distância_solar_venus * cos(theta)

    x = distância_solar_venus * sin(theta)

em que theta é aumentado em cada render pela velocidade angular de Vênus em relação ao Sol.

### Criação da Terra e Lua

Por outro lado, a implementação da Terra já demanda a utilização de propriedades de acoplamento descritas na classe Object3D. Os objetos podem ser pai de outros objetos e a posição do objeto filho é relativa à posição do pai.

De maneira sucinta, criou-se dois objetos esféricos e colocou-se o menor a uma certa distância do maior(distância lunar). Em seguida, definiu-se a lua como filha da Terra. Por fim, podemos codificar então o movimento da Lua em torno da Terra e da Terra em torno do Sol independentemente. Ou seja, a translação da lua ao redor da Terra se ajusta ao movimento da Terra.

### Criação de Saturno e seu anel

Saturno é criado tal como os outros planetas, porém seu anel usa conceitos THREE.js diferentes. O mesh do anel foi criado com a geometria RingGeometry, que representa um anel bidimensional com raios interno e externo definidos pelo usuário. O anel é filho de saturno, então translada junto a ele.

### Cálculo da matriz de camera

Para realizar o cálculo da matriz de câmera, o grupo utilizou um script de MATLAB, camera.m.
Neste script, deve-se tomar primeiramente 6 pontos do modelo 3D nomeados de point1 até point6, e em seguida, define-se outros 6 pontos de projeção em 2D, proj1 até proj6, correspondentes respectivamente aos 6 pontos 3D anteriores. Deste modo, consegue-se construir um sistema à obtenção da matriz de câmera utiliando a equação dada pelo método 1 da aula Viewing. A execução do script retorna um array de 11 elementos, que são os valores dos elememtos m11, m12, m13, m14, m21, ..., m33(com m34 normalizado para 1). 

## Interação com animação

Para controlar a visibilidade dos elementos da animação e também da imagem de fundo, são fornecidos três checkboxes auto explicativos que são vistos abaixo do canvas da animação. Note que tornar a animação invisivel não a pausa.

## Link para trabalho

https://kchendu.github.io/CCI-36Project1/main.html