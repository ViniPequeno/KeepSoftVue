<template>
  <v-container fluid>
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Atenção
        </v-card-title>

        <v-card-text>
          {{msg}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="sair"
          >
            Entendi
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Recuperar sua senha</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="login"
                label="Login"
                id="login"
                type="text"
                v-model="usuario.login"
                required></v-text-field>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="usuario.email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="senha"
                label="Nova senha"
                id="senha"
                v-model="usuario.senha"
                type="password"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmarNovaSenha"
                label="Confirme sua nova senha"
                id="confirmarNovaSenha"
                type="password"
                v-model="senha"
                required
                ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="button" @click.stop.prevent="trocarSenha" @key.enter="trocarSenha">Trocar senha</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "../axios/index";
export default {
  data() {
    return {
      id: "",
      concluido: false,
      dialog: false,
      encontrado: false,
      msg: "",
      senha: "",
      usuario: {
        email: "",
        login: "",
        senha: ""
      },
      usuarioOficial: {
        email: "",
        login: ""
      },
      alterarSenha: {
        id: "",
        senha: ""
      }
    };
  },
  methods: {
    trocarSenha() {
      if (this.usuario.email == "") {
        this.msg = "O campo email é obrigatório!";
        this.dialog = true;
      } else if (this.usuario.login == "") {
        this.msg = "O campo login é obrigatório!";
        this.dialog = true;
      } else if (this.usuario.senha == "") {
        this.msg = "O campo nova senha é obrigatório!";
        this.dialog = true;
      } else if (this.senha == "") {
        this.msg = "O campo confimar nova senha é obrigatório!";
        this.dialog = true;
      } else if (this.senha != this.usuario.senha) {
        this.msg = "Senha e confirmar senha não coincidem!";
        this.dialog = true;
      } else {
        if (this.usuario.login != this.usuarioOficial.login) {
          this.msg = "Login não coincide com o cadastrado!";
          this.dialog = true;
        } else if (this.usuario.email != this.usuarioOficial.email) {
          this.msg = "Email não coincide com o cadastrado!";
          this.dialog = true;
        } else {
          this.alterarSenha.id = this.id;
          this.alterarSenha.senha = this.usuario.senha;
          axios
            .put("/usuarios/alterarSenha", this.alterarSenha)
            .then(response => {
              this.concluido = true;
              this.msg = "Sua senha foi alterada com sucesso!";
              this.dialog = true;
            })
            .catch(e => {
              this.msg = "Sua senha não foi alterada com sucesso!";
              this.dialog = true;
            });
        }
      }
    },
    sair() {
      this.dialog = false;
      if (!this.encontrado) {
        this.$router.push("/");
      } else if (this.encontrado && this.concluido) {
        this.$router.push("/");
      }
    },
    decodificar: function(id) {
      return decodeURIComponent(
        atob(id)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    }
  },

  created() {
    this.id = this.decodificar(this.$route.params.id);
    axios
      .get("/usuarios/" + this.id)
      .then(response => {
        this.encontrado = true;
        this.usuarioOficial.login = response.data.login;
        this.usuarioOficial.email = response.data.email;
      })
      .catch(e => {
        this.encontrado = false;
        this.msg = "Usuário não encontrado!";
        this.dialog = true;
      });
  }
};
</script>