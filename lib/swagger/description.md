## Exame CSI-02

Alunos: Diego Fidalgo e Pedro Freitas

API de consulta aos dados de síndrome gripal no Brasil com base em informações de geolocalização

Esse projeto foi realizado em JavaScript, com o uso dos frameworks Vue.js, Quasar e Chart.js. O lançamento da plataforma foi feito com o uso de Vercel.

API's auxiliares:

* [Portal Brasileiro de Dados](https://dados.gov.br/dataset/casos-nacionais/resource/30c7902e-fe02-4986-b69d-906ca4c2ec36)
* [Here API](https://developer.here.com/)


## Interface da plataforma

![image](https://user-images.githubusercontent.com/48722002/144330578-2b8ff839-7437-41ed-8c52-24c88d98f032.png)

O site possui um mapa do território brasileiro e cada estado possui um bolha com tamanho proporcional ao número de casos:

![image](https://user-images.githubusercontent.com/48722002/144331053-b20eaa12-8193-45de-a87d-a938c2ee5ee3.png)

Cada bolha apresenta um resumo com o número de casos e o número de testes positivos.

Também há um gráfico de barras com informações sobre o número de testes positivos, negativos e casos totais em cada estado:

![image](https://user-images.githubusercontent.com/48722002/144332411-0bac6b59-7d94-46e2-9168-cce9a3cc6f7b.png)

Essas informações podem ser filtradas individualmente:

Filtro de um item            |  Filtro de dois itens
:-------------------------:|:-------------------------:
![image](https://user-images.githubusercontent.com/48722002/144333219-b2ec4124-103b-419e-8e0f-f9c47ecfc46c.png)  |  ![image](https://user-images.githubusercontent.com/48722002/144333202-8a0906b3-ebf8-4ea4-a037-2e5f764f1988.png)




