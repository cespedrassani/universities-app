# Universities App 🎓

O Universities App é uma aplicação móvel desenvolvida com React Native e Expo que permite aos usuários pesquisar universidades ao redor do mundo. Com uma interface amigável e intuitiva, os usuários podem filtrar universidades por país e visualizar detalhes como nome, site e país de origem.

## 📱 Demonstração do App

### Android
<a href="https://drive.google.com/file/d/1Cvlc7avb65vSigCP4gNQZamthUyrA66A/view?usp=sharing">
  <img src="https://cdn-icons-png.flaticon.com/512/174/174836.png" width="60" alt="Demo - Android"/>
</a>

### iOS
<a href="https://drive.google.com/file/d/1vM-4fEiGEtrg1hAE_SYi0kAf6oa6zB2b/view?usp=drive_link">
  <img src="https://img.icons8.com/ios11/512/mac-os.png" width="60" alt="Demo - iOS"/>
</a>

## 📋 Funcionalidades

- Pesquisa de universidades por país
- Visualização de detalhes das universidades
- Interface de usuário intuitiva e responsiva
- Navegação entre telas
- Integração com API pública de universidades

## 🚀 Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- Context API
- Axios
- React Native Paper

## ⚙️ Requisitos

- Node.js (v18 ou superior)
- NPM ou Yarn
- Expo CLI (```npx expo -h```)
- Um dispositivo móvel ou emulador para testar
- API universities-api (https://github.com/cespedrassani/universities-api)

## 🔧 Como Instalar e Executar

Siga estes passos para configurar o ambiente e executar o aplicativo localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/cespedrassani/universities-app.git
cd universities-app
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo de ambiente

Altere o arquivo `.env` na raiz do projeto para configurar a conexão com a API:

```
EXPO_PUBLIC_API_URL=http://SEU_ENDERECO_IP:3000
```

Substitua `SEU_ENDERECO_IP` pelo endereço IP da sua máquina na rede local.

> **Importante:** Ao usar o aplicativo em dispositivos físicos e emuladores, você precisa usar o IP da sua máquina na rede local (não use localhost ou 127.0.0.1). Se usar localhost o dispositivo não vai encontrar a api na rede, já que para ele localhost é ele mesmo.

Para descobrir seu endereço IP:
- No Windows: Execute `ipconfig` no prompt de comando
- No macOS/Linux: Execute `ifconfig` ou `ip addr show` no terminal

### 4. Inicie o servidor de desenvolvimento

```bash
npx expo start
```

### 5. Execute o aplicativo

Após iniciar o servidor de desenvolvimento, você verá um QR code no terminal

Para testar o aplicativo, você pode:

- Escanear o QR code e abra o aplicativo com Expo Go (disponível na App Store ou Google Play) em seu dispositivo móvel
- Pressionar `a` no terminal para abrir o aplicativo em um emulador Android (se configurado)
- Pressionar `i` no terminal para abrir o aplicativo em um emulador iOS (se estiver usando macOS e tiver o Xcode instalado)

## 🌐 Configuração da API

### Utilizando a API Local

Se você deseja executar o aplicativo com a API Node.js local:

1. Certifique-se de que a API Node.js está rodando na sua máquina
2. Obtenha o endereço IP da sua máquina na rede local
3. Configure o arquivo `.env` na raiz do projeto como descrito anteriormente:
   ```
   EXPO_PUBLIC_API_URL=http://SEU_ENDERECO_IP:3000
   ```
4. A aplicação usará automaticamente este endereço para fazer as requisições

### Resolução de Problemas de Conexão

Se o aplicativo não conseguir se conectar à API, verifique:

- Se o endereço IP no arquivo `.env` está correto
- Se a API está rodando e acessível (teste abrindo o endereço em um navegador e adicionando /api ao final dele, se estiver online deverá aparecer a documentação do swagger)
- Se não há firewall bloqueando a conexão
- Se o dispositivo ou emulador está na mesma rede que a máquina rodando a API
