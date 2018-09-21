# ᖽ senado.essencial

> conjunto de componentes essencials do portal senado.noticias

## instalação

O senado.essencial é um conjunto de estilos css baseados no portal `senado.noticias` que contém apenas seus
elementos principais (topo, navegação e rodapé). Sua organização é inspirada no
[smacss](http://smacss.com); sua nomenclatura, no [suitcss](http://suitcss.github.io/).

Os seguintes arquivos serão gerados:

* **dist/fat.css**: folha de estilos para sites que não utilizam o bootstrap 3
* **dist/this.css**: folha de estilos com apenas os componentes. Exige bootstrap 3 (testado com 3.3.4)
* **dist/iso-8859-1/*.html**, **dist/iso-8859-1/*.html**: markup dos componentes separados por codificação.

## desenvolvimento

Para executar o ambiente de desenvolvimento e compilar os arquivos .less e .jade automaticamente ao editá-los execute:

    grunt dev
