# 1.11.1

* Corrigir caminhos da task grunt:pug
* Recriar navglobal do fat


# 1.11.0

* Atualizar para webpack2
* Atualizar senado.css
* Utilizar o Fence do senado.css
* Remover classes não utilizadas
* Remover dependências não utilizadas
* Utilizar o mesmo NavGlobal para o fat e o thin
* Remover analytics do footer e jogar direto na template
* Ajustar includes do fat.pug
* Renomear pasta less para styles
* Renomear pasta jade para pug


#1.10.1

* Corrigir exibição no thin.less da lista de páginas dos servidores 


# 1.10.0

* Atualizar senado.css
* Incluir links no rodapé para as página de servidores.


# 1.9.0

* Padronizar subtítulo dos portais (.PortalTopo-sub)
* Incluir arquivos na pasta iso-8859-1 do build
* Fixar tamanho do sf-H1
* [twbs2] Ajustar .sf-component e <body> 
* [twbs2] Remover padding do body no viewport xs 
* [twbs2] Fix das margens do .container no viewport xs
* [twbs2] Definir alturar inicial do .collapse em 0  
* stylelint
* Deixar campo de busca preparado para o AZ
* Componente .PortalTopo-busca
* Utilizar querystring para versionar as fontes ao invés de alterar o nome do arquivo
* Separar Icon do glyphicons
* Atualizar versão do bootstrap (3.3.7)
* Organizar gruntfile
* Salvar configurações do icomoon
* Remover tarefa phantomjs
* Atualizar senado.css
* Novas fontes
* Converter .jade para .pug
* Remover componentes do bootstrap não utilizados
* Configurar .editorconfig
* Migrar build para webpack


# 1.8.5

* Permitir expansão do menu no iOS


# 1.8.4

* Link do blog e correção da procuradoria


# 1.8.3

* Corrigir links do topo e rodapé


# 1.8.2

* Corrigir links do topo e rodapé


# 1.8.1

* Atualizar portais no rodapé


# 1.8.0

* Alinhar texto à esquerda nos sf-component
* Separar trechos jade em comum
* Compatibilizar testes
* Arrumar texto do rodapé e não ocultar o texto Senado Federal no xs


# 1.7.3

* Atualizar testes


# 1.7.2

* Adicionar 0800 na última linha do rodapé


# 1.7.1

* Corrigir destino de alguns links do rodapé


# 1.7.0

## Markup

* Novo rodapé
* Ícone hamburger do menu colapse
* Ícone de hamburger no NavGlobal

## CSS

* Não importar glyphicons do bootstrap e utilizar uma versão mais enxuta no thin
* Substituir estilos de ícones pelo componentes do senado.css
* Novas fontes que incluem icones das redes sociais

## Outros

* Gerar pasta com utf 8 e realizar testes na versão de distribuição
* Atualizar do senado.css para 1.6.0
* Atualizar testes


# 1.4.0

## Markup

* ajuste na markup do topo global
* remover .row desnecessário que abrigavada o Nav--principal (** Note que a markup antiga pode não ser compatível com o novo CSS. **)

## CSS

* cor do item de menu do Nav--principal
* utilizar imagem em vez de fonte para o Icon--hamburger
* utilizar justify em vez do ícone hamburger qdo não houver o miniglyphicon
* forçar a remoção do sublinhado das âncoras

## Outros
* atualizar senado.css para 1.5.0, que utiliza o tamanho padrão do viewport.
* ajustes de compatibilidade com bootstrap 3.0.*
