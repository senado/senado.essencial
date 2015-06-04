# ᖽ senado.essencial

> conjunto de componentes essencials do portal senado.noticias

## pré-requisitos
* [node](https://iojs.org)
* grunt (`npm -g install grunt-cli`)

## instalação

O senado.essencial é um conjunto de estilos css baseados no portal `senado.noticias` que contém apenas seus
elementos principais (topo, navegação e rodapé). Sua organização é inspirada no
[smacss](http://smacss.com); sua nomenclatura, no [suitcss](http://suitcss.github.io/).

Para gerar os arquivos de distribuição, é necessário a instalação do grunt.

    npm -g install grunt-cli
    npm install
    grunt

Os seguintes arquivos serão gerados:

* **dist/fat.css**: folha de estilos para sites que não utilizam o bootstrap 3
* **dist/this.css**: folha de estilos com apenas os componentes. Exige bootstrap 3 (testado com 3.3.4)
* **dist/iso-8859-1/*.html**, **dist/iso-8859-1/*.html**: markup dos componentes separados por codificação.

## desenvolvimento
Para executar o ambiente de desenvolvimento e compilar os arquivos .less e .jade automaticamente ao editá-los execute:

    grunt dev


## problemas comuns
### Configurações de proxy
O `npm` no Windows não enxerga as configurações de proxy automaticamente. Para configurar utilize:

    npm config set proxy http://user:password@host:port
    npm config set https.proxy http://user:password@host:port
    
