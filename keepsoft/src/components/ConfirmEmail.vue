<template>
<v-app>
  <p-menu></p-menu>
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
        <h1>Confirmar email</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="login"
                label="Login"
                id="login"
                disabled
                type="text"
                v-model="usuario.login"
                required></v-text-field>
              <v-text-field
                name="email"
                label="Email"
                disabled
                id="email"
                type="email"
                v-model="usuario.email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="nome"
                label="Nome"
                id="nome"
                v-model="usuario.nome"
                disabled
                type="text"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="telefone"
                label="Telefone"
                id="telefone"
                type="text"
                disabled
                v-model="usuario.telefone"
                required
                ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="button" 
              @click.stop.prevent="confirmEmail" @key.enter="confirmEmail">Confirmar</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
  </v-app>
</template>

<script>
import axios from "../axios/index";
import Menu from "../components/Menu";
export default {
  components: {
    PMenu: Menu
  },
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
        nome: "",
        telefone: ""
      }
    };
  },
  methods: {
    confirmEmail() {
      axios
        .put("/usuarios/confirmEmail/" + this.id)
        .then(response => {
          this.concluido = true;
          this.msg = "Seu email confirmado com sucesso!";
          this.dialog = true;
        })
        .catch(e => {
          this.msg = "Sua email não foi confirmado com sucesso!";
          this.dialog = true;
        });
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
        this.usuario.login = response.data.login;
        this.usuario.email = response.data.email;
        this.usuario.nome = response.data.nome;
        this.usuario.telefone = response.data.telefone;
      })
      .catch(e => {
        this.encontrado = false;
        this.msg = "Usuário não encontrado!";
        this.dialog = true;
      });
  }
};
</script>