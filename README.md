# 🏫 Sistema de Reserva de Laboratórios

Protótipo web funcional para consulta e reserva de laboratórios, desenvolvido como atividade prática da disciplina **Maturidade em Desenvolvimento de Software** (Prof. Rafael Pacheco Ferreira).

## 📋 Sobre o Projeto

Este sistema permite que professores consultem laboratórios disponíveis e realizem reservas de forma simples e intuitiva, funcionando inteiramente no navegador (front-end only).

## ✅ Requisitos Atendidos

### Requisitos Funcionais

| ID   | Requisito             | Implementação                                                |
|------|-----------------------|--------------------------------------------------------------|
| RF01 | Consultar laboratórios | Tabela com nome, capacidade e situação (badges visuais)     |
| RF02 | Realizar reserva       | Formulário com seleção de lab, data, horário e finalidade   |
| RF03 | Validar reserva        | Validação de campos obrigatórios + regra de capacidade      |
| RF04 | Confirmar reserva      | Modal de confirmação com detalhes da reserva                |
| RF05 | Listar reservas        | Tabela dinâmica atualizada em tempo real                    |

### Requisitos Não Funcionais

| ID    | Requisito       | Implementação                                           |
|-------|-----------------|---------------------------------------------------------|
| RNF01 | Usabilidade     | Layout com seções claras, cores e badges informativos   |
| RNF02 | Responsividade  | CSS Grid + media queries para desktop e mobile          |

### Novo Requisito (Mudança)

> Laboratórios com capacidade inferior a 30 alunos **não podem** ser reservados para **aulas regulares**.

- Laboratório 03 (25 alunos) exibe badge "Restrito"
- Validação impede reserva com finalidade "Aula Regular" para labs com menos de 30 alunos

## 🧪 Dados Iniciais

| Laboratório      | Capacidade | Situação      |
|------------------|-----------|---------------|
| Laboratório 01   | 30 alunos | ✅ Disponível  |
| Laboratório 02   | 40 alunos | ❌ Indisponível|
| Laboratório 03   | 25 alunos | ⚠️ Restrito    |

## 🚀 Como Executar

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/reserva-laboratorios.git
   ```
2. Abra o arquivo `index.html` no navegador.
3. Pronto! Não é necessário servidor, banco de dados ou instalação.

## 🛠️ Tecnologias

- **HTML5** — Estrutura semântica
- **CSS3** — Estilização responsiva (Grid, Flexbox, media queries)
- **JavaScript** (Vanilla) — Lógica de negócio e manipulação do DOM

## 📐 Diagramas UML

### Diagrama de Casos de Uso
- Professor: Consultar Laboratórios, Realizar Reserva, Listar Reservas
- Sistema: Validar Reserva (include), Confirmar Reserva (include)

### Diagrama de Classes
- **Professor**: nome, matrícula
- **Reserva**: data, horário, finalidade
- **Laboratório**: nome, capacidade, disponível
- Relações: Professor *realiza* Reserva (1..*), Reserva *utiliza* Laboratório (*.1)

## 📄 Licença

Projeto acadêmico — Uso educacional.
